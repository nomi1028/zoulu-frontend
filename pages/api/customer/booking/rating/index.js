import connectDB from "../../../../../midleware/connectDB";
import User from "../../../../../models/User";
import Booking from "../../../../../models/Booking";
import Formidable from "formidable";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const total = await Booking.countDocuments({
        user_id: req.query.userId,
        status: "checkedOut",
      });
      const pagination = paginator(req.query.page, req.query.limit, total);
      let bookings = await Booking.find({
        user_id: req.query.userId,
        status: "checkedOut",
      })
        .populate([
          { path: "user_id" },
          { path: "products.service_id", populate: { path: "category_id" } },
          { path: "products.expert_id" },
        ])
        .sort({ created_at: -1 })
        .skip(pagination.start_index)
        .limit(pagination.records_per_page);
      return res.status(200).json({
        msg: "list of all bookings against user id: " + req.query.userId,
        pagination,
        data: bookings,
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
