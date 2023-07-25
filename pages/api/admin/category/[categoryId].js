import connectDB from "../../../../midleware/connectDB";
import CloudinaryUploadFile from "../../../../utils/cloudinaryUploadFile";
import Category from "../../../../models/Category";
import Services from "../../../../models/Service";
import SubCategory from "../../../../models/SubCategory";
import Formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "DELETE") {
      let category = await Category.findOne({
        _id: req.query.categoryId,
        deleted: false,
      });
      if (!category)
        return res.status(404).json({
          msg: `no category exists against id: ${req.query.categoryId}`,
        });

      await Category.findOneAndUpdate(
        { _id: req.query.categoryId },
        { deleted: true }
      );
      await SubCategory.updateMany(
        { category_id: req.query.categoryId },
        { deleted: true }
      );
      await Services.updateMany(
        { category_id: req.query.categoryId },
        { deleted: true }
      );

      return res.status(200).json({ msg: "category deleted successfully" });
    } else if (req.method === "PUT") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.name || !fields.description)
          return res
            .status(400)
            .json({ msg: "name, image & description & icon are required" });

        let checkCategory = await Category.findOne({
          name: fields.name,
          _id: { $ne: req.query.categoryId },
          deleted: false,
        });
        if (checkCategory)
          return res.status(409).json({
            msg: `category with the name '${fields.name}' already exists`,
          });
        let category = await Category.findById(req.query.categoryId);
        let filename = category.image;
        if (files && files.image) {
          if (category.image)
            await CloudinaryUploadFile(category.image, "destroy");
          filename = await CloudinaryUploadFile(files.image.filepath, "save");
        }
        let iconname = category.icon;
        if (files && files.icon) {
          if (category.icon)
            await CloudinaryUploadFile(category.icon, "destroy");
          iconname = await CloudinaryUploadFile(files.icon.filepath, "save");
        }

        Category.findOneAndUpdate(
          { _id: req.query.categoryId },
          {
            name: fields.name,
            image: filename,
            icon: iconname,
            description: fields.description,
            sub_category: JSON.parse(fields.subCategory),
          },
          { new: true },
          async (err, updatedCategory) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "error occurred while updating category" });
            return res.status(200).json({
              msg: "category updated successfully",
              data: updatedCategory,
            });
          }
        );
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
