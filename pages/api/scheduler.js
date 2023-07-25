import connectDB from "../../midleware/connectDB";
import Booking from "../../models/Booking";
const { CronJob } = require("cron");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      console.log("its running .");
      var job = new CronJob("*/15 * * * *", async () => {
        // var job = new CronJob("*/10 * * * *", async () => {
        // var job = new CronJob("*/10 * * * * *", async () => {
        console.log("mid night cron job");
        let bookings = await Booking.find({
          status: "checkedOut",
          products: { $elemMatch: { status: "pending" } },
        })
          .populate([
            { path: "user_id" },
            { path: "products.service_id", populate: { path: "category_id" } },
            { path: "products.expert_id" },
          ])
          .sort({ created_at: -1 });

        for (const booking of bookings) {
          for (const product of booking.products) {
            if (!product.pi_number && product.status === "pending") {
              let date1 = new Date(
                new Date(product.date).toISOString().split("T")[0] +
                  "T" +
                  product.start_time +
                  ":00"
              );
              let date2 = new Date().toISOString();
              const diffInTime =
                new Date(date1).getTime() - new Date(date2).getTime();
              const diffDays = Math.round(diffInTime / (24 * 3600 * 1000));

              if (diffDays <= 3 && booking.user_id.stripe_customer_id) {
                let customers = await stripe.customers.list({
                  email: booking.user_id.email,
                });
                const paymentIntent = await stripe.paymentIntents.create({
                  amount: parseInt(product.charges) * 100,
                  currency: "usd",
                  customer: customers.data[0].id,
                });
                const paymentIntentConfirm =
                  await stripe.paymentIntents.confirm(paymentIntent.id, {
                    payment_method:
                      customers.data[0].invoice_settings.default_payment_method,
                  });
                await booking.updateOne(
                  { $set: { "products.$[elem].pi_number": paymentIntent.id } },
                  { arrayFilters: [{ "elem._id": product._id }], new: true }
                );
              }
            }
          }
        }
      });
      job.start();
      res.status(200).json({ date1, date2, message: "CronJob scheduled!" });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
