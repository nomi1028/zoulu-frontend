const Stripe = require("stripe");
import connectDB from "../../../../midleware/connectDB";
import Formidable from "formidable";
import ExpertProfile from "../../../../models/ExpertProfile";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" });

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
        const { code, id } = fields;
        const result = await stripe.oauth.token({ grant_type: "authorization_code", code: code });
        const account = await stripe.accounts?.retrieve(result?.stripe_user_id)?.catch((err) => {
          return res.status(400).json({ msg: err });
        });
        ExpertProfile.findOneAndUpdate({ user_id: id }, { stripe_account_id: account?.id }, { new: true }, async (err, updatedUser) => {
          if (err) return res.status(400).json({ msg: "error occured while updating stripe id" });
          return res.status(200).json({ msg: "Stripe connected successfully" });
        });
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
