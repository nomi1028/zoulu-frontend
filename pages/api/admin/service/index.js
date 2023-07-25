import connectDB from "../../../../midleware/connectDB";
import Category from "../../../../models/Category";
import Service from "../../../../models/Service";
import SubCategory from "../../../../models/SubCategory";
import Package from "../../../../models/Package";
import Formidable from "formidable";
const paginator = require("../../../../utils/paginator");

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
        if (!fields.categoryId || !fields.name || !fields.description || !fields.options || !fields.preparations || !fields.steps || !fields.short_description || !fields.duration)
          return res.status(400).json({ msg: "categoryId, name, description,short_description ,packages,duration, preparations & steps are required" });
        let checkCategory = await Category.findById({ _id: fields.categoryId });
        if (!checkCategory) return res.status(404).json({ msg: `no category exists against id: ${fields.categoryId}` });
        const options = JSON.parse(fields.options);
        if (checkCategory.sub_category) {
          if (!fields.sub_category_id) return res.status(400).json({ msg: "Sub category is required" });
          let checkSubCategory = await SubCategory.findById({ _id: fields.sub_category_id });
          if (!checkSubCategory) return res.status(404).json({ msg: `no Sub category exists against id: ${fields.sub_category_id}` });
          let checkService = await Service.findOne({ category_id: fields.categoryId, sub_category_id: fields.sub_category_id, name: fields.name, deleted: false });
          if (checkService) return res.status(409).json({ msg: `service with the name '${fields.name}' already exists against category '${checkCategory.name} and subcategory '${checkSubCategory.name}'` });
          let service = await Service.create({
            category_id: fields.categoryId,
            name: fields.name,
            description: fields.description,
            duration: fields.duration,
            short_description: fields.short_description,
            options: options?.map((e) => ({ title: e.title, mandatory: e.mandatory })),
            preparations: fields.preparations,
            steps: JSON.parse(fields.steps),
            sub_category_id: fields.sub_category_id,
          });
          for (const option of service?.options) {
            for (const obj of options) {
              if (obj.title === option.title) {
                for (const packageObj of obj?.packages) {
                  packageObj.option_id = option?._id;
                  packageObj.service_id = service?._id;
                  await Package.create({ ...packageObj });
                }
              }
            }
          }
          await service.populate("category_id sub_category_id packages");
          return res.status(201).json({ msg: "service added successfully", data: service });
        } else {
          let checkService = await Service.findOne({ category_id: fields.categoryId, name: fields.name, deleted: false });
          if (checkService) return res.status(409).json({ msg: `service with the name '${fields.name}' already exists against category '${checkCategory.name}` });
          let service = await Service.create({
            category_id: fields.categoryId,
            name: fields.name,
            description: fields.description,
            short_description: fields.short_description,
            options: options?.map((e) => ({ title: e.title, mandatory: e.mandatory })),
            preparations: fields.preparations,
            steps: JSON.parse(fields.steps),
            duration: fields.duration,
          });
          for (const option of service?.options) {
            for (const obj of options) {
              if (obj.title === option.title) {
                for (const packageObj of obj?.packages) {
                  packageObj.option_id = option?._id;
                  packageObj.service_id = service?._id;
                  await Package.create({ ...packageObj });
                }
              }
            }
          }
          await service.populate("category_id");
          return res.status(201).json({ msg: "service added successfully", data: service });
        }
      });
    } else if (req.method === "GET") {
      const total = await Service.countDocuments({ deleted: false });
      const pagination = paginator(req.query.page, req.query.limit, total);
      let services = await Service.find({ deleted: false })
        .populate([{ path: "category_id", populate: { path: "sub_categories" } }, { path: "sub_category_id" }, { path: "packages" }])
        .sort({ created_at: -1 })
        .skip(pagination.start_index)
        .limit(pagination.records_per_page);
      return res.status(200).json({ msg: "list of all services", pagination, data: services });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
