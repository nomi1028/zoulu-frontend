import connectDB from "../../../../midleware/connectDB";
import CloudinaryUploadFile from "../../../../utils/cloudinaryUploadFile";
import SubCategory from "../../../../models/SubCategory";
import Services from "../../../../models/Service";
import Formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "DELETE") {
      let category = await SubCategory.findOne({ _id: req.query.subcategoryId, deleted: false });
      if (!category) return res.status(404).json({ msg: `no Sub category exists against id: ${req.query.subcategoryId}` });

      await SubCategory.findOneAndUpdate({ _id: req.query.subcategoryId }, { deleted: true });
      await Services.updateMany({ sub_category_id: req.query.subcategoryId }, { deleted: true });

      return res.status(200).json({ msg: "Sub category deleted successfully" });
    } else if (req.method === "PUT") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.name || !fields.category_id) return res.status(400).json({ msg: "name, image and catgeory are required" });

        let checkCategory = await SubCategory.findOne({ name: fields.name, _id: { $ne: req.query.subcategoryId }, deleted: false });
        if (checkCategory) return res.status(409).json({ msg: `Subcategory with the name '${fields.name}' already exists` });
        let category = await SubCategory.findById(req.query.subcategoryId);
        let filename = category.image;
        if (files && files.image) {
          if (category.image) await CloudinaryUploadFile(category.image, "destroy");
          filename = await CloudinaryUploadFile(files.image.filepath, "save");
        }

        SubCategory.findOneAndUpdate({ _id: req.query.subcategoryId }, { name: fields.name, image: filename, category_id: fields.category_id }, { new: true }, async (err, updatedCategory) => {
          if (err) return res.status(500).json({ msg: "error occurred while updating Subcategory" });
          await updatedCategory.populate("category_id");
          return res.status(200).json({ msg: "Subcategory updated successfully", data: updatedCategory });
        });
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
