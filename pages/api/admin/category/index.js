import connectDB from "../../../../midleware/connectDB";
import Category from "../../../../models/Category";
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
        if (
          !fields.name ||
          !files ||
          !files.image ||
          !fields.description ||
          !files.icon
        )
          return res
            .status(400)
            .json({ msg: "name, image & description & Icon are required" });

        let checkCategory = await Category.findOne({
          name: fields.name,
          deleted: false,
        });
        if (checkCategory)
          return res.status(409).json({
            msg: `category with the name '${fields.name}' already exists`,
          });
        let filename = await CloudinaryUploadFile(files.image.filepath, "save");
        let iconname = await CloudinaryUploadFile(files.icon.filepath, "save");
        let category = await Category.create({
          name: fields.name,
          image: filename,
          icon: iconname,
          description: fields.description,
          sub_category: JSON.parse(fields.subCategory),
        });
        return res
          .status(201)
          .json({ msg: "category added successfully", data: category });
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
