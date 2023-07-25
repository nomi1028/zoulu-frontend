import connectDB from "../../../midleware/connectDB";
import SubCategory from "../../../models/SubCategory";
const paginator = require("../../../utils/paginator");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const total = await SubCategory.countDocuments({ deleted: false });
      const pagination = paginator(req.query.page, req.query.limit, total);
      let subCategories = await SubCategory.find({ deleted: false }).populate("category_id services").sort({ created_at: -1 }).skip(pagination.start_index).limit(pagination.records_per_page);
      return res.status(200).json({ msg: "list of all Subcategories", pagination, data: subCategories });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
