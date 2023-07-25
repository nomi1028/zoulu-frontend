import connectDB from "../../../midleware/connectDB";
import User from "../../../models/User";
import Category from "../../../models/Category";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let category = await Category.findOne({
        _id: req.query.categoryId,
        deleted: false,
      }).populate("services");
      if (!category)
        return res.status(404).json({
          msg: `no category exists against id: ${req.query.categoryId}`,
        });
      return res.status(200).json({
        msg: "category against id: " + req.query.categoryId,
        data: category,
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
