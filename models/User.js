const mongoose = require("mongoose");
const ExpertProfile = require("./ExpertProfile");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["admin", "expert", "customer"],
    // required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  stripe_customer_id: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ["notSpecified", "male", "female", "other"],
    default: "notSpecified",
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
  block: {
    type: Boolean,
    default: false,
  },
});

UserSchema.virtual("profile", { ref: ExpertProfile, foreignField: "user_id", localField: "_id" });

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

mongoose.models = {};

let User = mongoose.model("user", UserSchema);

module.exports = User;
