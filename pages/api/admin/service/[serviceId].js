import connectDB from "../../../../midleware/connectDB";
import Service from "../../../../models/Service";
import Category from "../../../../models/Category";
import Services from "../../../../models/Service";
import SubCategory from "../../../../models/SubCategory";
import Formidable from "formidable";
import Package from "../../../../models/Package";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let service = await Service.findOne({ _id: req.query.serviceId, deleted: false }).populate("category_id");
      if (!service) return res.status(404).json({ msg: `no service exists against id: ${req.query.serviceId}` });

      return res.status(200).json({ msg: "service against id: " + req.query.serviceId, data: service });
    } else if (req.method === "DELETE") {
      let service = await Service.findOne({ _id: req.query.serviceId, deleted: false });
      if (!service) return res.status(404).json({ msg: `no service exists against id: ${req.query.serviceId}` });
      await Services.findOneAndUpdate({ _id: req.query.serviceId }, { deleted: true });
      return res.status(200).json({ msg: "service deleted successfully" });
    } else if (req.method === "PUT") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        console.log(fields);
        if (!fields.categoryId || !fields.name || !fields.description || !fields.preparations || !fields.steps || !fields.duration) return res.status(400).json({ msg: "categoryId, name, description,duration, preparations & steps are required" });
        let checkCategory = await Category.findById({ _id: fields.categoryId });
        if (!checkCategory) return res.status(404).json({ msg: `no category exists against id: ${fields.categoryId}` });
        const options = JSON.parse(fields.options);
        if (checkCategory.sub_category) {
          if (!fields.sub_category_id) return res.status(400).json({ msg: "Sub category is required" });
          let checkSubCategory = await SubCategory.findById({ _id: fields.sub_category_id });
          if (!checkSubCategory) return res.status(404).json({ msg: `no Sub category exists against id: ${fields.sub_category_id}` });
          let checkService = await Service.findOne({ _id: req.query.serviceId, category_id: fields.categoryId, sub_category_id: fields.sub_category_id, name: fields.name, deleted: false });
          if (!checkService) return res.status(409).json({ msg: `service with the name '${fields.name}' already exists against category '${checkCategory.name} and subcategory '${checkSubCategory.name}'` });
          Service.findOneAndUpdate(
            { _id: req.query.serviceId },
            {
              category_id: fields.categoryId,
              sub_category_id: fields.sub_category_id,
              name: fields.name,
              description: fields.description,
              short_description: fields.short_description,
              duration: fields.duration,
              preparations: fields.preparations,
              steps: JSON.parse(fields.steps),
              $push: { options: options },
            },
            { new: true },
            async (err, updatedService) => {
              if (err) return res.status(500).json({ msg: "error occurred while updating service" });
              for (const option of updatedService?.options) {
                for (const obj of options) {
                  if (obj.title === option.title) {
                    for (const packageObj of obj?.packages) {
                      packageObj.option_id = option?._id;
                      packageObj.service_id = req.query.serviceId;
                      await Package.create({ ...packageObj });
                    }
                  }
                }
              }
              await updatedService.populate("category_id sub_category_id packages");
              return res.status(200).json({ msg: "service updated successfully", data: updatedService });
            }
          );
        } else {
          let checkService = await Service.findOne({ category_id: fields.categoryId, name: fields.name, _id: req.query.serviceId, deleted: false });
          if (!checkService) return res.status(409).json({ msg: `service with the name '${fields.name}' already exists against category '${checkCategory.name}` });
          Service.findOneAndUpdate(
            { _id: req.query.serviceId },
            {
              category_id: fields.categoryId,
              name: fields.name,
              description: fields.description,
              short_description: fields.short_description,
              duration: fields.duration,
              preparations: fields.preparations,
              steps: JSON.parse(fields.steps),
              $push: { options: options },
            },
            { new: true },
            async (err, updatedService) => {
              if (err) return res.status(500).json({ msg: "error occurred while updating service" });
              for (const option of updatedService?.options) {
                for (const obj of options) {
                  if (obj.title === option.title) {
                    for (const packageObj of obj?.packages) {
                      packageObj.option_id = option?._id;
                      packageObj.service_id = req.query.serviceId;
                      await Package.create({ ...packageObj });
                    }
                  }
                }
              }
              await updatedService.populate("category_id sub_category_id");
              return res.status(200).json({ msg: "service updated successfully", data: updatedService });
            }
          );
        }
      });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
