import connectDB from "../../../../midleware/connectDB";
import User from "../../../../models/User";
import Booking from "../../../../models/Booking";

import ExpertProfile from "../../../../models/ExpertProfile";
import Category from "../../../../models/Category";
const paginator = require("../../../../utils/paginator");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let query = { products: { $elemMatch: { status: { $eq: "pending" } } } };

      if (req.query.type) {
        if (req.query.type === "upcoming") {
          query.products.$elemMatch.status = { $eq: "pending" };
        } else if (req.query.type !== "upcoming") {
          query.products.$elemMatch.status = { $ne: "pending" };
        }
      }

      const total = await Booking.countDocuments(
        { user_id: req.query.userId, status: "checkedOut", ...query },
        query
      );
      const pagination = paginator(req.query.page, req.query.limit, total);
      let bookings = await Booking.find(
        { user_id: req.query.userId, status: "checkedOut" }
        // query
      )
        .populate([
          { path: "user_id" },
          { path: "products.service_id", populate: { path: "category_id" } },
          { path: "products.expert_id" },
        ])
        .sort({ "products.date": 1 })
        .skip(pagination.start_index)
        .limit(pagination.records_per_page);
      var data = [];
      if (req.query.type) {
        if (req.query.type === "upcoming") {
          data = bookings.map((booking) => ({
            ...booking,
            products: booking.products.filter((e) => e.status === "pending"),
          }));
        } else {
          data = bookings.map((booking) => ({
            ...booking,
            products: booking.products.filter((e) => e.status !== "pending"),
          }));
        }
      }

      return res.status(200).json({
        msg: "all bookings",
        pagination,
        data,
      });
    }
    if (req.method === "PUT") {
      let checkBooking = await Booking.findOne({
        _id: req.query.booking_id,
        user_id: req.query.userId,
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

      if (product.pi_number && product.status === "pending") {
        let date1 = new Date(
          new Date(product.date).toISOString().split("T")[0] +
            "T" +
            product.start_time +
            ":00"
        );
        let date2 = new Date().toISOString();
        const diffInTime =
          new Date(date1).getTime() - new Date(date2).getTime();
        const diffHours = Math.round(diffInTime / (1000 * 60 * 60));
        console.log(product);
        if (diffHours >= 24)
          await stripe.refunds.create({ payment_intent: product.pi_number });
      }
      Booking.findOneAndUpdate(
        { _id: req.query.booking_id, status: "checkedOut" },
        { "products.$[elem].status": "cancelled" },
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
