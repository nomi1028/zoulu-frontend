const mongoose = require("mongoose");

const ExpertPackageSchema = mongoose.Schema({
  expert_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  services: {
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    packages: [
      {
        package_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "package",
          required: true,
        },
        price: {
          type: Number,
          default: 0,
        },
        duration: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
});
mongoose.models = {};
let ExpertPackage = mongoose.model("expert_package", ExpertPackageSchema);
export default ExpertPackage;
