const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        default: null,
      },
      duration: {
        type: Number,
        default: 0,
      },
      charges: {
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
        },
      ],
      extra_charges: {
        type: Number,
        default: 0,
      },
      start_time: {
        type: String,
        default: null,
      },
      date: {
        type: Date,
        default: null,
      },
      expert_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null,
      },
      rating: {
        type: Number,
        default: 0,
      },
      reviews: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        enum: ["pending", "cancelled", "completed", "confirmed"],
        default: "pending",
      },
      pi_number: {
        type: String,
        default: null,
      },
    },
  ],
  address: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["notSpecified", "checkedOut"],
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
});



mongoose.models = {};

let Booking = mongoose.model("booking", BookingSchema);

export default Booking;
