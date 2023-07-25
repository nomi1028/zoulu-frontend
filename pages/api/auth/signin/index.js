import connectDB from "../../../../midleware/connectDB";
const formidable = require("formidable");
import User from "../../../../models/User";
import ExpertProfile from "../../../../models/ExpertProfile";
import Booking from "../../../../models/Booking";
const jwt = require("jsonwebtoken");
const form = formidable({ multiples: false });
const bcrypt = require("bcryptjs");

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.email || !fields.password)
          return res.status(400).json({
            msg: "email & password are required parameters for request",
          });
        let user = await User.findOne({ email: fields.email }).populate(
          "profile"
        );
        if (!user)
          return res.status(404).json({ msg: "account does not exist" });
        bcrypt.compare(
          fields.password,
          user.password,
          async function (error, isMatch) {
            if (!isMatch)
              return res
                .status(400)
                .json({ msg: "email or password is incorrect" });
            if (user.block)
              return res
                .status(400)
                .json({ msg: "Can't login in you are block by admin" });
            if (user.role === "expert") {
              let rating = 0;
              let ratingCount = 0;

              let bookings = await Booking.find({
                status: "checkedOut",
                products: {
                  $elemMatch: {
                    status: { $eq: "confirmed" },
                    expert_id: user._id,
                  },
                },
              });
              console.log(bookings, "nomi");
              for (const booking of bookings) {
                for (const product of booking.products) {
                  if (
                    product.expert_id.toString() === user._id.toString() &&
                    product.status === "confirmed" &&
                    product.rating > 0
                  ) {
                    rating += product.rating;
                    ratingCount++;
                  }
                }
              }

              user = user.toObject();
              user.rating =
                ratingCount > 0 ? Math.round(rating / ratingCount) : 0;
            }
            console.log(user);
            jwt.sign(
              { data: user },
              "secret",
              { expiresIn: "12h" },
              async (err, token) => {
                if (err) throw err;
                return res
                  .status(200)
                  .json({ msg: "user logged in successfully", token: token });
              }
            );
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Server Error" });
  }
};

export default connectDB(handler);
