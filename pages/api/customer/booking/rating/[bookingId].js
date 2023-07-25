import connectDB from "../../../../../midleware/connectDB";
import User from "../../../../../models/User";
import Booking from "../../../../../models/Booking";
import Setting from "../../../../../models/Setting";
import Formidable from "formidable";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!req.query.bookingId || !req.query.product_id)
          return res
            .status(400)
            .json({ msg: "bookingId, productId & rating is required" });

        let checkBooking = await Booking.findOne({
          _id: req.query.bookingId,
          status: "checkedOut",
        });
        if (!checkBooking)
          return res.status(404).json({
            msg: `no booking exists against id: ${req.query.bookingId}`,
          });
        let product = checkBooking.products.find(
          (product) => product._id.toString() === req.query.product_id
        );
        if (!product)
          return res.status(404).json({
            msg: "no product exists against id " + req.query.product_id,
          });
        if (product.status === "cancelled")
          return res.status(400).json({ msg: "booking already cancelled" });
        if (
          product.status === "confirmed" &&
          (!fields.rating || fields.rating < 1)
        )
          return res
            .status(400)
            .json({ msg: "rating is required. rating cannot be less than 1" });
        if (product.rating > 0)
          return res.status(409).json({ msg: "review already added" });
        let updateQuery = {};
        if (product.status === "pending")
          updateQuery = { "products.$[elem].status": "completed" };
        if (product.status === "completed")
          updateQuery = { "products.$[elem].status": "confirmed" };
        if (product.status === "confirmed")
          updateQuery = {
            "products.$[elem].rating": fields.rating,
            "products.$[elem].reviews": fields.reviews,
          };

        Booking.findOneAndUpdate(
          { _id: req.query.bookingId },
          updateQuery,
          { arrayFilters: [{ "elem._id": req.query.product_id }], new: true },
          async (err, updatedBooking) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "error occurred while adding review" });
            await updatedBooking.populate([
              { path: "user_id" },
              {
                path: "products.service_id",
                populate: { path: "category_id" },
              },
              { path: "products.expert_id" },
            ]);

            let updatedProduct = updatedBooking.products.find(
              (product) =>
                product._id.toString() === req.query.product_id &&
                product.status === "confirmed"
            );
            if (updatedProduct && updatedProduct.expert_id.stripe_account_id) {
              let totalAmount =
                parseInt(updatedProduct.charges) +
                parseInt(updatedProduct.extra_charges);
              let setting = await Setting.findOne();
              let companyShare =
                (setting.company_percentage / totalAmount) * 100;
              let expertPayment = totalAmount - companyShare;
              await stripe.transfers.create(
                {
                  amount: expertPayment,
                  currency: "eur",
                  destination: updatedProduct.expert_id.stripe_account_id,
                },
                function (err, transfer) {
                  if (err)
                    return res.status(err.statusCode).json({ msg: err.code });
                }
              );
            }

            let msg = "";
            if (product.status === "pending")
              msg =
                "booking marked as completed. now, wait until customer confirms the booking";
            if (product.status === "completed")
              msg =
                "booking marked as confirmed. please add the rating and reviews against the expert";
            if (product.status === "confirmed")
              msg = "review has been added to booking successfully";
            return res.status(200).json({ msg: msg, data: updatedBooking });
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
