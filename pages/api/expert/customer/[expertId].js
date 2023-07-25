import connectDB from "../../../../midleware/connectDB";
import User from "../../../../models/User";
import ExpertProfile from "../../../../models/ExpertProfile";
import Booking from "../../../../models/Booking";
import Formidable from "formidable";

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
          return res
            .status(404)
            .json({
              msg: `no expert exists against id: ${req.query.expertId}`,
            });

        let distinctRecords = await Booking.find({
          status: "checkedOut",
          products: {
            $elemMatch: { expert_id: req.query.expertId },
          },
        }).distinct("user_id");

        let customers = new Array();
        for (const distinctRecord of distinctRecords) {
          customers.push(await User.findById(distinctRecord));
        }
        return res
          .status(200)
          .json({
            msg: "list of customers against expert id: " + req.query.expertId,
            data: customers,
          });
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
