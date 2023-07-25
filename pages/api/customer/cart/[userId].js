import connectDB from "../../../../midleware/connectDB";

import Booking from "../../../../models/Booking";
import User from "../../../../models/User";
import ExpertPackage from "../../../../models/ExpertPackage";
import ExpertProfile from "../../../../models/ExpertProfile";
import Category from "../../../../models/Category";
import Service from "../../../../models/Service";
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let cart = await Booking.findOne({
        user_id: req.query.userId,
        status: "notSpecified",
      }).populate([
        { path: "products.service_id", populate: { path: "category_id" } },
        { path: "products.expert_id" },
        { path: "products.packages.package_id" },
      ]);
      for (let product of cart.products) {
        if (!product.expert_id) continue;
        let rating = 0;
        let ratingCount = 0;

        let bookings = await Booking.find({
          status: "checkedOut",
          products: {
            $elemMatch: {
              status: { $eq: "confirmed" },
              expert_id: product.expert_id,
            },
          },
        });

        for (const booking of bookings) {
          for (const product of booking?.products) {
            if (product.status === "confirmed" && product.rating > 0) {
              rating += product.rating;
              ratingCount++;
            }
          }
        }

        let temp = product.toObject();
        temp.expert_id.rating =
          ratingCount > 0 ? Math.round(rating / ratingCount) : 0;
        product = temp;
      }
      if (!cart)
        return res
          .status(404)
          .json({ msg: `no cart exists against user: ${req.query.userId}` });

      return res
        .status(200)
        .json({ msg: "cart against user: " + req.query.userId, data: cart });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
