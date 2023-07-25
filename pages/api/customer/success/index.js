import connectDB from "../../../../midleware/connectDB";
import Booking from "../../../../models/Booking";
import Formidable from "formidable";
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
        if (!fields.booking_id)
          return res.status(400).json({ msg: "booking_id is required" });
  
        let checkBooking = await Booking.findOne({ _id: fields.booking_id, status: "notSpecified" });
        if(!checkBooking) return res.status(404).json({msg: `no booking exists against id: ${fields.booking_id}`});
        const session = await stripe.checkout.sessions.retrieve(
          checkBooking.pi_number
        );
        console.log(session);
        
        Booking.findOneAndUpdate(
          { _id: fields?.booking_id },
          {
            status: "paid",
            transaction_date: new Date(),
            pi_number: session.payment_intent
          },
          { new: true },
          async (err, updated) => {
            if (err)
              return res
                .status(500)
                .json({ msg: `error occurred while updating booking` });
            return res
              .status(200)
              .json({ msg: `booking paid successfully`, data: updated });
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
