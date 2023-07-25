import connectDB from "../../../../midleware/connectDB";
import Booking from "../../../../models/Booking";
import User from "../../../../models/User";
const paginator = require("../../../../utils/paginator");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let checkExpert = await User.findOne({ _id: req.query.expertId, role: 'expert' });
      if (!checkExpert) return res.status(404).json({ msg: `no expert exists against id: ${req.query.expertId}` });
      let query = { products: { $elemMatch: { status: { $eq:'pending' }, expert_id: req.query.expertId } } };
      
      if (req.query.type) {
        if (req.query.type === "upcoming") {
          query.products.$elemMatch.status = { $eq:'pending' };
        } else {
          query.products.$elemMatch.status = { $ne: "pending" };
        }
      }
      
      const total = await Booking.countDocuments({ status: "checkedOut", ...query }, query);
      const pagination = paginator(req.query.page, req.query.limit, total);
      
      let bookings = await Booking.find({ status: "checkedOut", ...query }, query)
        .populate([{ path: "user_id" }, { path: "products.service_id", populate: { path: "category_id" } }])
        .sort({ 'products.date': 1 })
        .skip(pagination.start_index)
        .limit(pagination.records_per_page);
      return res.status(200).json({
        msg: "list of all bookings against expert id: " + req.query.expertId,
        pagination,
        data: bookings,
      });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
