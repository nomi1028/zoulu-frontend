import connectDB from "../../../../midleware/connectDB";
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
      const total = await User.countDocuments({ role: "customer" });
      const pagination = paginator(req.query.page, req.query.limit, total);
      let customers = await User.find({ role: "customer" })
        .sort({ created_at: -1 })
        .skip(pagination.start_index)
        .limit(pagination.records_per_page);
      return res
        .status(200)
        .json({ msg: "list of all customers", pagination, data: customers });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
