import connectDB from "../../../../midleware/connectDB";
import Service from "../../../../models/Service";
import Formidable from "formidable";
import Package from "../../../../models/Package";

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.option || !fields.serviceId) return res.status(400).json({ msg: "option and serviceId are required" });
        if (!req.query.optionId) return res.status(400).json({ msg: "OptionId is required" });
        const option = JSON.parse(fields.option);
        const findService = await Service.findOne({ _id: fields.serviceId });
        if (!findService) return res.status(400).json({ msg: `no service exist againts id :${fields.serviceId}` });
        console.log(option);
        Service.findByIdAndUpdate(
          fields.serviceId,
          { $set: { "options.$[elem].title": option.title, "options.$[elem].mandatory": option.mandatory, "options.$[elem].deleted": option.deleted } },
          { arrayFilters: [{ "elem._id": option._id }], new: true },
          async (err, updated) => {
            if (err) return res.status(400).json({ msg: "Something went wrong try again later" });
            for (const obj of option.packages) {
              if (obj._id) {
                await Package.findByIdAndUpdate(obj._id, { title: obj.title, duration: obj.duration, service_id: fields.serviceId, option_id: option?._id, deleted: obj?.deleted }, { new: true });
              } else {
                await Package.create({ title: obj.title, duration: obj.duration, service_id: fields.serviceId, option_id: option?._id });
              }
            }
            return res.status(200).json({ msg: "Option updated successfully" });
          }
        );
      });
    } else if (req.method === "DELETE") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.option || !fields.serviceId) return res.status(400).json({ msg: "option and serviceId are required" });
        if (!req.query.optionId) return res.status(400).json({ msg: "OptionId is required" });
        const option = JSON.parse(fields.option);
        const findService = await Service.findOne({ _id: fields.serviceId });
        if (!findService) return res.status(400).json({ msg: `no service exist againts id :${fields.serviceId}` });
        Service.findByIdAndUpdate(
          fields.serviceId,
          { $set: { "options.$[elem].title": option.title, "options.$[elem].mandatory": option.mandatory, "options.$[elem].deleted": true } },
          { arrayFilters: [{ "elem._id": option._id }], new: true },
          async (err, updated) => {
            if (err) return res.status(400).json({ msg: "Something went wrong try again later" });
            for (const obj of option.packages) {
              if (obj._id) {
                await Package.findByIdAndUpdate(obj._id, { title: obj.title, duration: obj.duration, service_id: fields.serviceId, option_id: option?._id, deleted: true }, { new: true });
              }
            }
            return res.status(200).json({ msg: "Option updated successfully" });
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
