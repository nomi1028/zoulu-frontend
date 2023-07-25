import moment from "moment";
import connectDB from "../../../../midleware/connectDB";
import User from "../../../../models/User";
import Booking from "../../../../models/Booking";
import Setting from "../../../../models/Setting";
const paginator = require("../../../../utils/paginator");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      if (req.query.duration == "lastweek") {
        var d = new Date();
        var e = d.setTime(d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000);
        var s = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000);
        var endDate = moment(e).format();
        var startDate = moment(s).format();
        console.log(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
      } else {
        var startDate = moment()
          .startOf(req.query.duration || "week")
          .format();
        var endDate = moment().format();
      }

      const numberOfCustomers = await User.countDocuments({ role: "customer", created_at: { $gte: `${startDate}`, $lt: `${endDate}` } }).sort({ created_at: -1 });
      const customers = await User.find({ role: "customer", created_at: { $gte: `${startDate}`, $lt: `${endDate}` } }).sort({ created_at: -1 });
      let bookings = await Booking.find({ status: "checkedOut" })
        .populate([{ path: "user_id" }, { path: "products.service_id", populate: { path: "category_id" } }, { path: "products.expert_id" }])
        .sort({ created_at: -1 });
      let totalRevenue = 0;
      let totalBookingRevenue = 0;
      for (const booking of bookings) {
        for (const product of booking.products) {
          let start = startDate;
          let end = endDate;
          if (new Date(product.date) >= new Date(start) && new Date(product.date) <= new Date(end) && product.status === "confirmed") {
            totalRevenue += parseInt(product.charges) + parseInt(product.extra_charges);
            totalBookingRevenue += parseInt(product.charges) + parseInt(product.extra_charges);
          }
        }
      }
      let setting = await Setting.findOne();
      totalRevenue = Number((totalRevenue * setting?.company_percentage) / 100 || 0);
      const expert = await User.find({ role: "expert", created_at: { $gte: `${startDate}`, $lt: `${endDate}` } }).sort({ created_at: -1 });
      //   last 7 days customer
      const recentCustomers = await User.find({ role: "customer", created_at: { $gte: `${new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)}`, $lt: `${moment().format()}` } }).sort({ created_at: -1 });
      return res.status(200).json({ msg: "list of  customers", data: { numberOfCustomers, customers, recentCustomers, expert, totalRevenue, totalBookingRevenue } });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
