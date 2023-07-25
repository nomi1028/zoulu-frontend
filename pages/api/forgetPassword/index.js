import connectDB from "../../../midleware/connectDB";
import CloudinaryUploadFile from "../../../utils/cloudinaryUploadFile";
import User from "../../../models/User";
import Formidable from "formidable";
import Category from "../../../models/Category";
import ExpertProfile from "../../../models/ExpertProfile";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SendMail = require("../../../utils/mail");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const form = new Formidable.IncomingForm({ multiples: true });
      form.parse(req, async (err, fields, files, query) => {
        let checkUser = await User.findOne({
          email: fields.email,
        }).populate("profile");

        if (!checkUser) {
          return res.status(404).json({ msg: `Account not exist` });
        }

        if (checkUser) {
          var result = "";
          var chars =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          for (var i = 12; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
          const salt = await bcrypt.genSalt(10);
          let password = await bcrypt.hash(result, salt);
          SendMail(
            fields.email,
            "New Password has been send  Successfully",
            `<p>Here is your password: ${result}</p>`
          );
          User.findOneAndUpdate(
            { _id: checkUser?._id },
            {
              password: password,
            },
            { new: true },
            async (err, updatedUser) => {
              if (err) {
                return res
                  .status(500)
                  .json({ msg: "error occurred while updating password" });
              } else {
                return res.status(200).json({
                  msg: "New password has been sent to your email",
                });
              }
            }
          );
        }
      });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
