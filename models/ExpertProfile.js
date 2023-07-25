const mongoose = require("mongoose");
import ExpertPackage from "./ExpertPackage";

const ExpertProfileSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  stripe_account_id: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  treatments: [
    {
      category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        default: null,
      },

      certificate: {
        type: String,
        default: null,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      // services: [
      //   {
      //     service_id: {
      //       type: mongoose.Schema.Types.ObjectId,
      //       ref: "service",
      //       default: null,
      //     },
      //     price: {
      //       type: Number,
      //       default: 0,
      //     },
      //   },
      // ],
    },
  ],
  approved: {
    type: Boolean,
    default: false,
  },
  portfolio: [
    {
      filename: {
        type: String,
        default: null,
      },
    },
  ],
  questions: [
    {
      question: {
        type: String,
        default: null,
      },
      answer: {
        type: String,
        default: null,
      },
    },
  ],
  availability: [
    {
      day: {
        type: String,
        default: null,
      },
      available: {
        type: Boolean,
        default: false,
      },
      start_time: {
        type: String,
        default: null,
      },
      end_time: {
        type: String,
        default: null,
      },
    },
  ],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  radius: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

ExpertProfileSchema.index({ location: "2dsphere" });
ExpertProfileSchema.virtual("expert_services", { ref: ExpertPackage, foreignField: "expert_id", localField: "user_id" });

ExpertProfileSchema.set("toObject", { virtuals: true });
ExpertProfileSchema.set("toJSON", { virtuals: true });
mongoose.models = {};

let ExpertProfile = mongoose.model("expert_profile", ExpertProfileSchema);

module.exports = ExpertProfile;
