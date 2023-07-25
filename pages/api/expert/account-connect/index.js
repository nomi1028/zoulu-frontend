import connectDB from "../../../../midleware/connectDB";
import Service from "../../../../models/Service";
import User from "../../../../models/User";
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
    if (req.method === "GET") {
      const form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields, files, query) => {
        // const state = req.query.state;
        // const account = await stripe.accounts.create({type: 'standard'});
        //   console.log(account);
        // const accountLink = await stripe.accountLinks.create({
        //   account: 'acct_1Mc1bFQsQjPnjVTY',
        //   refresh_url: 'https://example.com/reauth',
        //   return_url: 'https://example.com/return',
        //   type: 'account_onboarding',
        // });
        await stripe.accounts.retrieve(
          "acct_1Mc1bFQsQjPnjVTY",
          function (err, account) {
            if (err) return res.status(err.statusCode).json({ msg: err.code });
            console.log(account.id);
            console.log(account.email); // prints the email of the account
            console.log(account.country);
          }
        );
        // acct_1MeC6YQpCfKf5b5b
        // const connectUrl = stripe.oauth.authorizeUrl({
        //   scope: 'read_write',
        //   state: state
        // });
        // console.log(connectUrl);
        // res.redirect(connectUrl);

        // Handle the Stripe OAuth callback and retrieve the access token
        // app.get('/callback', async (req, res) => {
        //   const code = req.query.code;
        //   const {state} = req.query;
        //   const response = await stripe.oauth.token({
        //     grant_type: 'authorization_code',
        //     code: code
        //   });
        //
        //   const connectedAccountId = response.stripe_user_id;
        //
        //   // Store the access token in your database
        //   const accessToken = response.access_token;
        //
        //   res.redirect(`https://yourwebsite.com/success?state=${state}&connectedAccountId=${connectedAccountId}&accessToken=${accessToken}`);
        // });

        // Initiate a payment to the connected account
        // app.post('/payment', async (req, res) => {
        //   const {amount, connectedAccountId} = req.body;
        //
        //   // Create a payment intent and confirm it
        //   const paymentIntent = await stripe.paymentIntents.create({
        //     amount: amount,
        //     currency: 'usd',
        //     transfer_data: {
        //       destination: connectedAccountId,
        //     },
        //   });
        //
        //   await stripe.paymentIntents.confirm(paymentIntent.id);
        //
        //   res.status(200).send({success: true});
        // });
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
