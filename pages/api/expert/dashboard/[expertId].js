import connectDB from "../../../../midleware/connectDB";
import Service from "../../../../models/Service";
import User from "../../../../models/User";
import ExpertProfile from "../../../../models/ExpertProfile";
import Formidable from "formidable";
import Booking from "../../../../models/Booking";
import Setting from "../../../../models/Setting";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        let checkExpert = await User.findOne({
          _id: req.query.expertId,
          role: "expert",
        });
        if (!checkExpert)
          return res.status(404).json({
            msg: `no expert exists against id: ${req.query.expertId}`,
          });

        let distinctRecords = await Booking.find({
          status: "checkedOut",
          products: {
            $elemMatch: { expert_id: req.query.expertId },
          },
        }).distinct("user_id");
        console.log(distinctRecords, "distinctRecords");
        let customers = new Array();
        for (const distinctRecord of distinctRecords) {
          customers.push(await User.findById(distinctRecord));
        }
        console.log(customers);
        let women = new Array();
        let men = new Array();
        for (const customer of customers) {
          if (customer.gender == "male") {
            men.push(customer);
          } else if (customer.gender === "female") {
            women.push(customer);
          }
        }
        let bookings = await Booking.find({
          status: "checkedOut",
          products: { $elemMatch: { expert_id: req.query.expertId } },
        });
        let currentYear = new Date().getFullYear();
        let yearlyBookings = new Array();
        let totalRevenue = 0;
        for (const booking of bookings) {
          for (const product of booking.products) {
            let start = req.query.year
              ? req.query.year + "-" + "01-01T00:00:00.000Z"
              : currentYear + "-" + "01-01T00:00:00.000Z";
            let end = req.query.year
              ? req.query.year + "-" + "12-31T00:00:00.000Z"
              : currentYear + "-" + "12-31T00:00:00.000Z";
            if (
              new Date(product.date) >= new Date(start) &&
              new Date(product.date) <= new Date(end) &&
              product.expert_id.toString() === req.query.expertId.toString() &&
              product.status === "confirmed"
            ) {
              yearlyBookings.push(product);
              totalRevenue +=
                parseInt(product.charges) + parseInt(product.extra_charges);
            }
          }
        }
        let males = await User.countDocuments({
          role: "customer",
          verified: true,
          gender: "male",
        });
        let females = await User.countDocuments({
          role: "customer",
          verified: true,
          gender: "female",
        });

        let allGenders = await User.countDocuments({
          role: "customer",
          verified: true,
        });
        console.log(allGenders, "allGenders");

        let setting = await Setting.findOne();
        totalRevenue =
          totalRevenue -
          Number((totalRevenue * setting?.company_percentage) / 100 || 0);
        let data = {
          yearlyBookings: yearlyBookings,
          totalRevenue: totalRevenue,
          genderStats: {
            men: (men.length / customers.length) * 100,
            women: (women.length / customers.length) * 100,
          },
        };
        return res.status(200).json({ msg: `dashboard data`, data: data });
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
