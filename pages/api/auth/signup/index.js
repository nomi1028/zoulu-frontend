import connectDB from "../../../../midleware/connectDB";
const formidable = require("formidable");
import User from "../../../../models/User";
import ExpertProfile from "../../../../models/ExpertProfile";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const form = formidable({ multiples: false });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.role || !fields.type || !fields.email)
          return res
            .status(400)
            .json({
              msg: "role, type & email are required parameters for request",
            });
        if (
          fields.type === "form" &&
          (!fields.password || fields.password.length < 8 || !fields.name)
        )
          return res
            .status(400)
            .json({
              msg: "name, email & password are required parameters for request. Password length is minimum 8 characters",
            });
        if (!["expert", "customer"].includes(fields.role))
          return res
            .status(400)
            .json({
              msg: "expert & customer are the valid value for parameter role",
            });
        if (!["form", "social"].includes(fields.type))
          return res
            .status(400)
            .json({
              msg: "form & social are the valid value for parameter type",
            });
        if (fields.role === "expert" && !fields.phoneNumber)
          return res.status(400).json({ msg: "phone number is required" });

        let checkUser = await User.findOne({ email: fields.email });
        if (fields.type === "form" && checkUser && checkUser.password)
          return res
            .status(409)
            .json({ msg: "user with this email already exists" });

        if (!checkUser) {
          let password = null;
          if (fields.type === "form")
            password = await generatePassword(fields.password);
          checkUser = await User.create({
            name: fields.name,
            email: fields.email,
            password: password,
            phone_number: fields.role === "expert" ? fields.phoneNumber : null,
            role: fields.type === "social" ? "customer" : fields.role,
          });
          delete checkUser?.password;
        }

        if (checkUser && !checkUser.password) {
          let password = null;
          if (fields.type === "form")
            password = await generatePassword(fields.password);
          User.findOneAndUpdate(
            { email: fields.email },
            {
              name: fields.name,
              password: password,
            },
            { new: true },
            async (err, updatedUser) => {
              if (err)
                return res
                  .status(500)
                  .json({ msg: "error occurred while updating signup" });
              checkUser = updatedUser;
            }
          );
        }

        if (fields.type === "form" && fields.role === "expert")
          await ExpertProfile.create({ user_id: checkUser?._id });

        await checkUser.populate("profile");
        jwt.sign(
          { data: checkUser },
          "secret",
          { expiresIn: "12h" },
          async (err, token) => {
            if (err) throw err;
            return res
              .status(200)
              .json({ msg: "user logged in successfully", token: token });
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

async function generatePassword(userEnteredPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(userEnteredPassword, salt);
}

export default connectDB(handler);
