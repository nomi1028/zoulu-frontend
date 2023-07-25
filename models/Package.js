const mongoose = require("mongoose");
const PackageSchema = mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },
  option_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service.options",
    required: true,
  },
  title: {
    type: String,
    default: null,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
// PackageSchema.virtual("option", {
//   ref: "service.options",
//   localField: "option_id",
//   foreignField: "_id",
//   justOne: true,
// });

mongoose.models = {};

let Package = mongoose.model("package", PackageSchema);

export default Package;
