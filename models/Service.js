const mongoose = require("mongoose");
import Package from "./Package";
import ExpertPackage from "./ExpertPackage";

const ServiceSchema = mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
  sub_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "sub_category", default: null },
  name: { type: String, required: true },
  description: { type: String, default: null },
  short_description: { type: String, default: null },
  price_per_minute: { type: Number, default: 0 },
  preparations: { type: String, default: "" },
  steps: [{ type: String, default: null }],
  options: [{ title: { type: String, default: null }, mandatory: { type: Boolean, default: false }, deleted: { type: Boolean, default: false } }],
  deleted: { type: Boolean, default: false },
  duration: { type: Number, default: 0 },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

ServiceSchema.virtual("packages", { ref: Package, foreignField: "service_id", localField: "_id" });
ServiceSchema.virtual("service_experts", { ref: ExpertPackage, foreignField: "services.service_id", localField: "_id" });

ServiceSchema.set("toObject", { virtuals: true });
ServiceSchema.set("toJSON", { virtuals: true });

mongoose.models = {};

let Service = mongoose.model("service", ServiceSchema);

export default Service;
