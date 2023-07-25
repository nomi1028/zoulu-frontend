import connectDB from "../../../midleware/connectDB";
import CloudinaryUploadFile from "../../../utils/cloudinaryUploadFile";
import User from "../../../models/User";
import Formidable from "formidable";
import Category from "../../../models/Category";
import ExpertProfile from "../../../models/ExpertProfile";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      console.log(req, "console.log(updatedUser);");
      const form = new Formidable.IncomingForm({ multiples: true });
      form.parse(req, async (err, fields, files, query) => {
        let checkUser = await User.findOne({ _id: req.query.userId }).populate(
          "profile"
        );
        if (!checkUser)
          return res
            .status(404)
            .json({ msg: `no user exists against id: ${req.query.userId}` });

        if (checkUser) {
          bcrypt.compare(
            fields?.password,
            checkUser?.password,
            async function (error, isMatch) {
              if (!isMatch)
                return res
                  .status(400)
                  .json({ msg: "email or password is incorrect" });
            }
          );
        }
        if (fields.newpassword) {
          var password = await generatePassword(fields.newpassword);
        }

        User.findOneAndUpdate(
          { _id: req.query.userId },
          {
            password: password,
          },
          { new: true },
          async (err, updatedUser) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "error occurred while updating user" });

            // if (updatedUser.role === "expert") {
            //   let treatments = new Array();
            //   if (files && files.certificates) {
            //     let categories = JSON.parse(fields.categories);
            //     console.log(categories.length, files.certificates);
            //     let allCertificates = new Array();
            //     if (files && !Array.isArray(files.certificates)) {
            //       allCertificates = [{ ...files.certificates }];
            //     }
            //     if (files && Array.isArray(files.certificates)) {
            //       allCertificates = [...files.certificates];
            //     }
            //     if (categories.length !== allCertificates.length)
            //       return res.status(400).json({
            //         msg: "certificates for all categories are required",
            //       });
            //     for (const category of categories) {
            //       let checkCategory = await Category.findOne({ _id: category });
            //       if (!checkCategory)
            //         return res.status(404).json({
            //           msg: `no category exists against id: ${category}`,
            //         });
            //     }

            //     for (let [i, certificate] of allCertificates.entries()) {
            //       let filename = await CloudinaryUploadFile(
            //         certificate.filepath,
            //         "save"
            //       );
            //       treatments.push({
            //         category_id: categories[i],
            //         certificate: filename,
            //       });
            //     }
            //   }
            //   let coordinates = JSON.parse(fields.coordinates);
            //   ExpertProfile.findOneAndUpdate(
            //     { user_id: req.query.userId },
            //     {
            //       $push: { treatments: treatments },
            //       location: {
            //         type: "Point",
            //         coordinates: [coordinates.long, coordinates.lat],
            //       },
            //       availability: JSON.parse(fields.availability),
            //       radius: fields.radius,
            //     },
            //     { new: true },
            //     async (err, updatedProfile) => {
            //       if (err)
            //         return res
            //           .status(500)
            //           .json({ msg: "error occurred while updating profile" });
            //     }
            //   );
            // }
            await updatedUser.populate("profile");
            console.log(updatedUser);
            jwt.sign(
              { data: updatedUser },
              "secret",
              { expiresIn: "12h" },
              async (err, token) => {
                if (err) throw err;
                return res
                  .status(200)
                  .json({ msg: "profile updated successfully", data: token });
              }
            );
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
async function generatePassword(userEnteredPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(userEnteredPassword, salt);
}
export default connectDB(handler);
