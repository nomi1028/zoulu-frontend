import connectDB from "../../../midleware/connectDB";
import SubCategory from "../../../models/SubCategory";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let subcategory = await SubCategory.findOne({ _id: req.query.subcategoryId, deleted: false }).populate("services");
      if (!subcategory) return res.status(404).json({ msg: `no Subcategory exists against id: ${req.query.subcategoryId}` });
      return res.status(200).json({ msg: "Subcategory against id: " + req.query.subcategoryId, data: subcategory });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
