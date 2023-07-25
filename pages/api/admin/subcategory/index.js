import connectDB from "../../../../midleware/connectDB";
import SubCategory from "../../../../models/SubCategory";
import Formidable from "formidable";
import CloudinaryUploadFile from "../../../../utils/cloudinaryUploadFile";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.name || !files || !files.image || !fields.category_id) return res.status(400).json({ msg: "name, image and catgeory are required" });
        let checkSubCategory = await SubCategory.findOne({ name: fields.name, deleted: false });
        if (checkSubCategory) return res.status(409).json({ msg: `Sub category with the name '${fields.name}' already exists` });
        let filename = await CloudinaryUploadFile(files.image.filepath, "save");
        let subCategory = await SubCategory.create({ name: fields.name, image: filename, category_id: fields.category_id });
        await subCategory.populate("category_id");
        return res.status(201).json({ msg: "Sub category added successfully", data: subCategory });
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
