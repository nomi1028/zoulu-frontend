import connectDB from "../../../../midleware/connectDB";
import Service from "../../../../models/Service";

import User from "../../../../models/User";
import ExpertPackage from "../../../../models/ExpertPackage";
import ExpertProfile from "../../../../models/ExpertProfile";
import Category from "../../../../models/Category";
import Formidable from "formidable";
import Booking from "../../../../models/Booking";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.userId || !fields.products || !fields.address)
          return res
            .status(400)
            .json({ msg: "userId, products & address are required" });

        let products = JSON.parse(fields.products);
        for (const product of products) {
          let checkService = await Service.findOne({ _id: product.service_id });
          if (!checkService)
            return res.status(404).json({
              msg: `no service exists against id: ${product.service_id}`,
            });
        }
        // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        // console.log(paymentIntent)
        Booking.findOneAndUpdate(
          { user_id: fields.userId, status: "notSpecified" },
          {
            user_id: fields.userId,
            products: JSON.parse(fields.products),
            address: fields.address,
          },
          { new: true, upsert: true },
          async (err, updatedBooking) => {
            if (err)
              return res
                .status(500)
                .json({ msg: `error occurred while updating cart` });
            await updatedBooking.populate([
              { path: "user_id" },
              {
                path: "products.service_id",
                populate: { path: "category_id" },
              },
              {
                path: "products.expert_id",
              },
              { path: "products.packages.package_id" },
            ]);

            if (fields?.checkout) {
              if (!updatedBooking.user_id.stripe_customer_id) {
                if (
                  !fields.cardNumber ||
                  !fields.expiryMonth ||
                  !fields.expiryYear ||
                  !fields.cvc
                )
                  return res.status(400).json({
                    msg: "for checkout card number, expiry month, expiry year & cvc is required",
                  });

                let paymentMethod = await stripe.paymentMethods
                  .create({
                    type: "card",
                    card: {
                      number: fields.cardNumber,
                      exp_month: fields.expiryMonth,
                      exp_year: fields.expiryYear,
                      cvc: fields.cvc,
                    },
                  })
                  .catch((err) => {
                    if (err.code === "invalid_expiry_month")
                      return res
                        .status(400)
                        .json({ msg: "the card entered has been expired" });
                    if (err.code === "incorrect_number")
                      return res
                        .status(400)
                        .json({ msg: "the card number is incorrect" });
                  });

                const customer = await stripe.customers.create({
                  email: updatedBooking.user_id.email,
                });
                await stripe.paymentMethods.attach(paymentMethod.id, {
                  customer: customer.id,
                });
                await stripe.customers.update(customer.id, {
                  invoice_settings: {
                    default_payment_method: paymentMethod.id,
                  },
                });
                await User.updateOne(
                  { _id: updatedBooking.user_id._id },
                  { stripe_customer_id: customer.id }
                );
              }
              await updatedBooking.updateOne({
                status: "checkedOut",
              });
            }

            for (let product of updatedBooking.products) {
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
            return res
              .status(200)
              .json({ msg: `cart updated successfully`, data: updatedBooking });
            // const paymentMethod = await stripe.paymentMethods.retrieve('pm_1MdTj9JNDOmTcINHT5Q1mj1e');
            // await stripe.paymentMethods.retrieve(
            //   'pm_1MdTj9JNDOmTcINHT5Q1mj1e',
            //   function(err, paymentMethod) {
            //     if (err) {
            //       console.log('Error retrieving payment method:', err);
            //     } else {
            //       console.log('Payment method status:', paymentMethod.status);
            //     }
            //   }
            // );

            // console.log("paymentMethod => ", paymentMethod);
            // console.log("token => ", token);

            // const customers = await stripe.customers.list({
            //   email: updatedBooking.user_id.email,
            // });
            // console.log("customer => ", customers.data[0].invoice_settings.default_payment_method);
            // const paymentIntent = await stripe.paymentIntents.create({
            //   amount: 1000,
            //   currency: 'usd',
            //   customer: customer.id,
            // });
            // const paymentIntent = await stripe.paymentIntents.confirm(
            //   'pi_3MdTjCJNDOmTcINH061E8dGW',
            //   {payment_method: 'pm_1MdTj9JNDOmTcINHT5Q1mj1e'}
            // );
            // console.log("payment => ",paymentIntent)
            // const session = await stripe.checkout.sessions.create({
            //   payment_method_types: ["card"],
            //   line_items: updatedBooking.products.map((product) => {
            //     return {
            //       price_data: {
            //         currency: "eur",
            //         product_data: {
            //           name: `${product?.service_id?.name}`,
            //         },
            //         unit_amount: (product.charges + product.extra_charges) * 100,
            //       },
            //       quantity: 1,
            //     };
            //   }),
            //   payment_intent_data: {
            //     capture_method: 'manual'
            //   },
            //   mode: 'payment',
            //   success_url: `${req.headers.origin}/Success?booking_id=${updatedBooking?._id}&session_id={CHECKOUT_SESSION_ID}`,
            //   cancel_url: `${req.headers.origin}/Canceled?booking_id=${updatedBooking?._id}&session_id={CHECKOUT_SESSION_ID}`
            // });

            // await updatedBooking.updateOne({ pi_number: session.id });

            // return res.status(200).json({
            //   msg: `cart updated successfully`,
            //   data: updatedBooking,
            //   // url: session.url,
            // });
            // }
          }
        );
      });
    } else if (req.method === "PUT") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        if (!fields.userId || !fields.productId)
          return res
            .status(400)
            .json({ msg: "userId & productId are required" });

        let booking = await Booking.findOne({
          user_id: fields.userId,
          status: "notSpecified",
        });
        if (!booking)
          return res
            .status(404)
            .json({ msg: "no cart exists against user id:" + fields.userId });
        let product = booking.products.find(
          (x) => x._id.toString() == fields.productId.toString()
        );
        if (!product)
          return res
            .status(404)
            .json({ msg: "no product exists against id: " + fields.productId });

        Booking.findOneAndUpdate(
          { user_id: fields.userId, status: "notSpecified" },
          {
            $pull: { products: { _id: product._id } },
          },
          { new: true },
          async (err, updatedBooking) => {
            if (err)
              return res
                .status(500)
                .json({ msg: `error occurred while updating cart` });
            await updatedBooking.populate([
              {
                path: "products.service_id",
                populate: { path: "category_id" },
              },
              { path: "products.expert_id" },
              { path: "products.packages.package_id" },
            ]);
            return res.status(200).json({
              msg: `item removed from cart successfully`,
              data: updatedBooking,
            });
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
