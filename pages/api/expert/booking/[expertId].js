import moment from "moment";
import connectDB from "../../../../midleware/connectDB";
import User from "../../../../models/User";
import Booking from "../../../../models/Booking";
import Category from "../../../../models/Category";
import ExpertProfile from "../../../../models/ExpertProfile";
import Service from "../../../../models/Service";
const paginator = require("../../../../utils/paginator");
const SendMail = require("../../../../utils/mail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import "moment/locale/de";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let checkExpert = await User.findOne({
        _id: req.query.expertId,
        role: "expert",
      });
      if (!checkExpert)
        return res
          .status(404)
          .json({ msg: `no expert exists against id: ${req.query.expertId}` });

      let query = {
        products: {
          $elemMatch: {
            status: { $eq: "pending" },
            expert_id: req.query.expertId,
          },
        },
      };

      if (req.query.type) {
        if (req.query.type === "upcoming") {
          query.products.$elemMatch.status = { $eq: "pending" };
        } else if (req.query.type !== "upcoming") {
          query.products.$elemMatch.status = { $ne: "" };
        }
      }

      const total = await Booking.countDocuments({
        status: "checkedOut",
        ...query,
      });
      const pagination = paginator(req.query.page, req.query.limit, total);

      let bookings = await Booking.find({ status: "checkedOut", ...query })
        .populate([
          { path: "user_id" },
          { path: "products.service_id", populate: { path: "category_id" } },
          { path: "products.expert_id", populate: { path: "profile" } },
        ])
        .sort({ "products.date": 1 })
        .skip(pagination.start_index)
        .limit(pagination.records_per_page);

      let allConfirmedBookings = await Booking.find({
        status: "checkedOut",
        products: {
          $elemMatch: {
            status: { $eq: "confirmed" },
            expert_id: req.query.expertId,
          },
        },
      });
      let countConfirmed = 0;
      for (const confirmedBooking of allConfirmedBookings) {
        for (const product of confirmedBooking.products) {
          if (
            product.status === "confirmed" &&
            product.expert_id.toString() === req.query.expertId
          )
            countConfirmed++;
        }
      }
      console.log(bookings);
      var data = [];
      var pendingData = [];
      var pastData = [];
      if (req.query.type) {
        if (req.query.type === "upcoming") {
          pendingData = bookings.map((booking) => ({
            ...booking,
            products: booking.products.filter(
              (e) =>
                e.status === "pending" &&
                e.expert_id._id.toString() === req.query.expertId.toString()
            ),
          }));
          console.log("pendingData", pendingData, "pendingData");
          for (const booking of pendingData) {
            for (const value of booking.products) {
              var bookingStatus = completeBooking(
                value?.start_time,
                value?.duration,
                value?.date
              );

              if (bookingStatus) {
                data.push({ bookingID: booking._doc, product: value });
              }
            }
          }
        } else {
          console.log("upcoming", bookings, "upcoming");
          pastData = bookings.map((booking) => ({
            ...booking,
            products: booking.products.filter(
              (e) =>
                e.status !== "cancelled" &&
                e.expert_id._id.toString() === req.query.expertId.toString()
            ),
          }));
          console.log(pastData, "pastBookings");
          for (const booking of pastData) {
            for (const value of booking.products) {
              console.log(booking, "bookingggggg");
              var bookingStatus = completeBooking(
                value?.start_time,
                value?.duration,
                value?.date
              );
              console.log(bookingStatus, "past");
              if (!bookingStatus) {
                data.push({ bookingID: booking._doc, product: value });
              }
            }
          }
        }
      }

      console.log(data, "bookingData");
      return res.status(200).json({
        msg: "list of all bookings against expert id: " + req.query.expertId,
        pagination,
        data: data,
        confirmedBookings: countConfirmed,
      });
    }
    if (req.method === "PUT") {
      let checkBooking = await Booking.findOne({
        _id: req.query.booking_id,
        status: "checkedOut",
      });
      if (!checkBooking)
        return res.status(404).json({
          msg: `no booking exists against id: ${req.query.booking_id}`,
        });
      let product = checkBooking.products.find(
        (product) => product._id.toString() === req.query.product_id
      );
      if (!product)
        return res.status(404).json({
          msg: "no product exists against id " + req.query.product_id,
        });
      if (product.status === "cancelled")
        return res.status(409).json({ msg: "booking already cancelled" });
      if (product.status === "completed" || product.status === "confirmed")
        return res
          .status(400)
          .json({ msg: "booking already completed cannot proceed to cancel" });

      if (product.pi_number && product.status === "pending") {
        await stripe.refunds.create({ payment_intent: product.pi_number });
        SendMail(
          updatedBooking.user_id.email,
          "Booking Cancelled",
          `<p>Your Booking for <span style="font-weight: bold; text-transform: capitalize">${
            product.service_id.name
          }</span> has been cancelled by the expert, <span style="font-weight: bold; text-transform: capitalize">${
            product.expert_id.name
          }</span>, which was booked for, <span style="font-weight: bold; text-transform: capitalize">${new Date(
            product.date
          ).toDateString()}</span> at <span style="font-weight: bold; text-transform: capitalize">${
            product.start_time
          }</span></p>`
        );
      }
      Booking.findOneAndUpdate(
        { _id: req.query.booking_id, status: "checkedOut" },
        {
          // status: "notSpecified",
          "products.$[elem].status": "cancelled",
          // "products.$[elem].expert_id": null,
          "products.$[elem].charges": 0,
          "products.$[elem].extra_charges": 0,
        },
        { arrayFilters: [{ "elem._id": req.query.product_id }], new: true },
        async (err, updatedBooking) => {
          if (err)
            return res
              .status(500)
              .json({ msg: "error occurred while cancelling booking" });
          await updatedBooking.populate([
            { path: "user_id" },
            { path: "products.service_id", populate: { path: "category_id" } },
            { path: "products.expert_id" },
          ]);

          return res.status(200).json({
            msg: "booking cancelled successfully",
            data: updatedBooking,
          });
        }
      );
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
function completeBooking(start_time, min_to_add, valueDate) {
  // const date = new Date(`1970-01-01T${start_time}:00`);
  // date.setMinutes(date.getMinutes());
  // const newTimeString = date.toLocaleTimeString("en-US", {
  //   hour12: false,
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });
  // let datee = moment(valueDate).format("YYYY-MM-DD");
  // let time = newTimeString;
  // let concaDate = datee + "T" + time;
  let newDate = getStartTime(valueDate, start_time);
  // var now = moment();
  // var now = new Date();
  const now = new Date();
  const localTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
  );
  // testing
  const timestamp = localTime.getTime();
  console.log(timestamp, "testing live");
  if (timestamp >= newDate) {
    return false;
  } else if (timestamp < newDate) {
    return true;
  }
}
function getStartTime(date, start_time) {
  console.log(start_time);
  let datee = moment(date).format("YYYY-MM-DD");
  let time = start_time;
  let concaDate = datee + "T" + time;
  let newDate = new Date(concaDate);
  return newDate;
}
