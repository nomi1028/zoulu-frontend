import connectDB from "../../../../midleware/connectDB";
import CloudinaryUploadFile from "../../../../utils/cloudinaryUploadFile";
import User from "../../../../models/User";
import Category from "../../../../models/Category";
import ExpertProfile from "../../../../models/ExpertProfile";
import Formidable from "formidable";

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
        console.log(files, "filecoming from frontend");
        if (
          !fields.userId ||
          !fields.gender ||
          !fields.address ||
          // !fields.radius ||
          !fields.country ||
          !fields.questions ||
          !fields.categories ||
          !fields.coordinates ||
          !files ||
          !files.certificates
        )
          return res.status(400).json({
            msg: "userId, gender, address, radius, country, questions, categories, coordinates & certificates are required",
          });

        let checkUser = await User.findOne({
          _id: fields.userId,
          role: "expert",
        });
        if (!checkUser)
          return res
            .status(404)
            .json({ msg: `no expert exists against id: ${fields.userId}` });
        let categories = JSON.parse(fields.categories);
        let allCertificates = new Array();
        if (files && !Array.isArray(files.certificates)) {
          allCertificates = [{ ...files.certificates }];
        }
        if (files && Array.isArray(files.certificates)) {
          allCertificates = [...files.certificates];
        }
        if (categories.length !== allCertificates.length)
          return res
            .status(400)
            .json({ msg: "certificates for all categories are required" });
        for (const category of categories) {
          let checkCategory = await Category.findOne({ _id: category });
          if (!checkCategory)
            return res
              .status(404)
              .json({ msg: `no category exists against id: ${category}` });
        }

        let treatments = new Array();
        for (let [i, certificate] of allCertificates.entries()) {
          let filename = await CloudinaryUploadFile(
            certificate.filepath,
            "save"
          );
          treatments.push({
            category_id: categories[i],
            certificate: filename,
          });
        }
        let coordinates = JSON.parse(fields.coordinates);
        ExpertProfile.findOneAndUpdate(
          { user_id: fields.userId },
          {
            country: fields.country,
            treatments: treatments,
            questions: JSON.parse(fields.questions),
            location: {
              type: "Point",
              coordinates: [coordinates.long, coordinates.lat],
            },
            radius: fields.radius,
          },
          { new: true },
          async (err, updatedProfile) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "error occurred while updating profile" });

            User.findOneAndUpdate(
              { _id: fields.userId },
              {
                gender: fields.gender,
                address: fields.address,
              },
              { new: true },
              async (err, updatedUser) => {
                if (err)
                  return res
                    .status(500)
                    .json({ msg: "error occurred while updating user" });
                await updatedUser.populate({
                  path: "profile",
                  populate: { path: "treatments.category_id" },
                });
                return res.status(200).json({
                  msg: "application has been sent to admin for approval",
                  data: updatedUser,
                });
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

export default connectDB(handler);
