const mongoose = require("mongoose");
import Service from "./Service";

const SubCategorySchema = mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  deleted: { type: Boolean, default: false },
  updated_at: { type: Date, default: new Date() },
});

SubCategorySchema.virtual("services", { ref: Service, foreignField: "sub_category_id", localField: "_id" });

SubCategorySchema.set("toObject", { virtuals: true });
SubCategorySchema.set("toJSON", { virtuals: true });

mongoose.models = {};

let SubCategory = mongoose.model("sub_category", SubCategorySchema);

export default SubCategory;
