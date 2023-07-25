import connectDB from "../../../../midleware/connectDB";
import Booking from "../../../../models/Booking";
import Setting from "../../../../models/Setting";
const paginator = require("../../../../utils/paginator");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const total = await Booking.countDocuments({ status: "checkedOut" });
      const pagination = paginator(req.query.page, req.query.limit, total);
      let bookings = await Booking.find({ status: "checkedOut" })
        .populate([{ path: "user_id" }, { path: "products.service_id", populate: { path: "category_id" } }, { path: "products.expert_id" }])
        .sort({ created_at: -1 });

      let setting = await Setting.findOne();
      return res.status(200).json({ msg: "list of all bookings", pagination, data: { bookings, setting } });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
