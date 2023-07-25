import connectDB from "../../../../midleware/connectDB";
const formidable = require("formidable");
import User from "../../../../models/User";
const form = formidable();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.phoneNumber || !fields.userId)
          return res.status(400).json({
            msg: "phone number & userId are required parameter for request",
          });

        let checkUser = await User.findOne({
          phone_number: fields.phoneNumber,
          verified: true,
        });
        if (checkUser)
          return res.status(409).json({
            msg: "phone number already exists. please try with another one",
          });

        User.findOneAndUpdate(
          { _id: fields.userId },
          {
            phone_number: fields.phoneNumber,
          },
          { new: true },
          async (err, updatedUser) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "error occurred while updating phone number" });
            return res
              .status(200)
              .json({ msg: "Phone number updated successfully" });
          }
        );
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
