const mongoose = require("mongoose");
import Service from "./Service";
import SubCategory from "./SubCategory";

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  deleted: { type: Boolean, default: false },
  updated_at: { type: Date, default: new Date() },
  sub_category: { type: Boolean, default: false },
});

CategorySchema.virtual("services", {
  ref: Service,
  foreignField: "category_id",
  localField: "_id",
});
CategorySchema.virtual("sub_categories", {
  ref: SubCategory,
  foreignField: "category_id",
  localField: "_id",
});

CategorySchema.set("toObject", { virtuals: true });
CategorySchema.set("toJSON", { virtuals: true });

mongoose.models = {};

let Category = mongoose.model("category", CategorySchema);

export default Category;
