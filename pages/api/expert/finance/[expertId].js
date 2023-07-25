import connectDB from "../../../../midleware/connectDB";
import Service from "../../../../models/Service";
import User from "../../../../models/User";
import Formidable from "formidable";
import Booking from "../../../../models/Booking";
import Setting from "../../../../models/Setting";
import moment from "moment";
const paginator = require("../../../../utils/paginator");

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
        const total = await Booking.countDocuments({ status: "checkedOut" });
        const pagination = paginator(req.query.page, req.query.limit, total);
        let bookings = await Booking.find({
          status: "checkedOut",
          products: { $elemMatch: { expert_id: req.query.expertId } },
        })
          .populate([{ path: "products.service_id" }])
          .sort({ created_at: -1 });

        let yearlyBookings = new Array();
        let totalRevenue = 0;
        let setting = await Setting.findOne();
        for (const booking of bookings) {
          for (const product of booking.products) {
            if (req.query.duration == "lastweek") {
              var d = new Date();
              var e = d.setTime(
                d.getTime() -
                  (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000
              );
              var s = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000);
              var endDate = moment(e).format();
              var startDate = moment(s).format();
            } else {
              var startDate = moment()
                .startOf(req.query.duration || "week")
                .format();
              var endDate = moment().format();
            }
            if (
              moment(booking.created_at).format() >= startDate &&
              moment(booking.created_at).format() <= endDate &&
              product.expert_id.toString() === req.query.expertId.toString() &&
              product.status === "confirmed"
            ) {
              product.charges =
                product.charges -
                Number(
                  (product.charges * setting?.company_percentage) / 100 || 0
                );
              product.date = booking.created_at;

              yearlyBookings.push(product);
              totalRevenue +=
                parseInt(product.charges) + parseInt(product.extra_charges);
            }
          }
        }
        console.log(yearlyBookings, "booking");
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

        let data = {
          Bookings: yearlyBookings,
          totalRevenue: totalRevenue,
          genderStats: {
            men: (males / allGenders) * 100,
            women: (females / allGenders) * 100,
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
