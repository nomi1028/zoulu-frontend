import connectDB from "../../../midleware/connectDB";
import CloudinaryUploadFile from "../../../utils/cloudinaryUploadFile";
import User from "../../../models/User";
import Formidable from "formidable";
import Category from "../../../models/Category";
import Booking from "../../../models/Booking";
import ExpertProfile from "../../../models/ExpertProfile";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
export const config = { api: { bodyParser: false } };

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let user = await User.findOne({ _id: req.query.userId }).populate({
        path: "profile",
        populate: {
          path: "treatments.category_id",
          populate: { path: "services", populate: { path: "packages" } },
        },
      });
      if (!user)
        return res
          .status(404)
          .json({ msg: `no user exists against id: ${req.query.userId}` });
      return res
        .status(200)
        .json({ msg: "user against id: " + req.query.userId, data: user });
    } else if (req.method === "PUT") {
      const form = new Formidable.IncomingForm({ multiples: true });
      form.parse(req, async (err, fields, files, query) => {
        let checkUser = await User.findOne({ _id: req.query.userId }).populate(
          "profile"
        );
        if (!checkUser)
          return res
            .status(404)
            .json({ msg: `no user exists against id: ${req.query.userId}` });
        let image = checkUser.image;
        if (files && files.image) {
          if (image) await CloudinaryUploadFile(image, "destroy");
          image = await CloudinaryUploadFile(files.image.filepath, "save");
        }
        User.findOneAndUpdate(
          { _id: req.query.userId },
          {
            name: fields.name,
            gender: fields.gender,
            image: image,
            address: fields.address,
          },
          { new: true },
          async (err, updatedUser) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "error occurred while updating user" });
            if (updatedUser.role === "expert") {
              let treatments = new Array();
              let portfolios = new Array();
              if (files && files.portfolio) {
                let allportfolio = new Array();
                if (files && !Array.isArray(files.portfolio)) {
                  allportfolio = [{ ...files.portfolio }];
                }
                if (files && Array.isArray(files.portfolio)) {
                  allportfolio = [...files.portfolio];
                }

                for (let [i, portfolio] of allportfolio.entries()) {
                  let filename = await CloudinaryUploadFile(
                    portfolio.filepath,
                    "save"
                  );
                  portfolios.push({
                    filename,
                  });
                }
                console.log(portfolios, "portfolios");
              }
              if (files && files.certificates) {
                let categories = JSON.parse(fields.categories);
                console.log(categories.length);
                let allCertificates = new Array();
                if (files && !Array.isArray(files.certificates)) {
                  allCertificates = [{ ...files.certificates }];
                }
                if (files && Array.isArray(files.certificates)) {
                  allCertificates = [...files.certificates];
                }
                if (categories.length !== allCertificates.length)
                  return res.status(400).json({
                    msg: "certificates for all categories are required",
                  });
                for (const category of categories) {
                  let checkCategory = await Category.findOne({ _id: category });
                  if (!checkCategory)
                    return res.status(404).json({
                      msg: `no category exists against id: ${category}`,
                    });
                }

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
              }
              let coordinates = JSON.parse(fields.coordinates);

              if (fields.stripeAccountId) {
                await stripe.accounts.retrieve(
                  fields.stripeAccountId,
                  function (err, account) {
                    if (err)
                      return res.status(err.statusCode).json({ msg: err.code });
                  }
                );
              }
              let treatmentsAgainstExpert = await ExpertProfile.findOne({
                user_id: req.query.userId,
              });
              for (const [
                index,
                treatment,
              ] of treatmentsAgainstExpert.treatments.entries()) {
                for (const [i, upcoming] of treatments.entries()) {
                  if (
                    ObjectId(treatment.category_id).equals(upcoming.category_id)
                  ) {
                    treatmentsAgainstExpert.treatments[index].certificate =
                      upcoming.certificate;
                  }
                }
              }
              if (fields.portfolioID) {
                let expert = await ExpertProfile.findOne({
                  user_id: req.query.userId,
                  // status: "notSpecified",
                });
                if (!expert)
                  return res.status(404).json({
                    msg: "no portfolio exists against user id:" + fields.userId,
                  });
                var product = expert.portfolio.find(
                  (x) => x._id.toString() == fields.portfolioID.toString()
                );
                if (!product)
                  return res.status(404).json({
                    msg: "no portfolio exists against id: " + fields.productId,
                  });
              }

              if (JSON.parse(fields.addCertificates)) {
                console.log(":inIf");
                ExpertProfile.findOneAndUpdate(
                  { user_id: req.query.userId },
                  {
                    $push: { treatments: treatments },
                    location: {
                      type: "Point",
                      coordinates: [coordinates.long, coordinates.lat],
                    },
                    availability: JSON.parse(fields.availability),
                    radius: fields.radius,
                    stripe_account_id: fields.stripeAccountId,
                  },
                  { new: true },
                  async (err, updatedProfile) => {
                    if (err)
                      return res
                        .status(500)
                        .json({ msg: "error occurred while updating profile" });
                  }
                );
              } else if (fields.portfolioID) {
                ExpertProfile.findOneAndUpdate(
                  { user_id: req.query.userId },

                  {
                    $pull: { portfolio: { _id: product._id } },

                    treatments: treatmentsAgainstExpert.treatments,
                    location: {
                      type: "Point",
                      coordinates: [coordinates.long, coordinates.lat],
                    },
                    availability: JSON.parse(fields.availability),
                    radius: fields.radius,
                    stripe_account_id: fields.stripeAccountId,
                  },
                  { new: true },
                  async (err, updatedProfile) => {
                    if (err)
                      return res
                        .status(500)
                        .json({ msg: "error occurred while updating profile" });
                  }
                );
              } else {
                ExpertProfile.findOneAndUpdate(
                  { user_id: req.query.userId },

                  {
                    $push: { portfolio: portfolios },
                    treatments: treatmentsAgainstExpert.treatments,
                    location: {
                      type: "Point",
                      coordinates: [coordinates.long, coordinates.lat],
                    },
                    availability: JSON.parse(fields.availability),
                    radius: fields.radius,
                    stripe_account_id: fields.stripeAccountId,
                  },
                  { new: true },
                  async (err, updatedProfile) => {
                    if (err)
                      return res.status(500).json({
                        msg: "error occurred while updating profile",
                      });
                  }
                );
              }
            }
            let rating = 0;
            let ratingCount = 0;

            let bookings = await Booking.find(
              {
                status: "checkedOut",
                products: {
                  $elemMatch: {
                    status: { $eq: "confirmed" },
                    expert_id: updatedUser._id,
                  },
                },
              },
              {
                products: {
                  $elemMatch: {
                    status: { $eq: "confirmed" },
                    expert_id: updatedUser._id,
                  },
                },
              }
            );
            for (const booking of bookings) {
              for (const product of booking.products) {
                if (
                  product.expert_id.toString() === updatedUser._id.toString() &&
                  product.status === "confirmed" &&
                  product.rating > 0
                ) {
                  rating += product.rating;
                  ratingCount++;
                }
              }
            }
            await updatedUser.populate("profile");
            updatedUser = updatedUser.toObject();
            updatedUser.rating =
              ratingCount > 0 ? Math.round(rating / ratingCount) : 0;
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

export default connectDB(handler);
