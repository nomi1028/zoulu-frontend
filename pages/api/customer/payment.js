import connectDB from "../../../midleware/connectDB";
const stripe = require("stripe") ("sk_test_51MP636JNDOmTcINHfgKrsTMq1lbF9KnIObEUL8KTcBiTw79gMf00zCbLakzTSWhL0fpK8Z6QcHd0234PjugZ21fJ00LDnndRct");

export const config = {
  api: {
    bodyParser: false,
  }
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      // const customers = await stripe.customers.list({
      //   limit: 3,
      // });
      //
      const payout = await stripe.payouts.create({
        amount: 1000,
        currency: 'eur',
      }, {
        stripeAccount: 'acct_1MP636JNDOmTcINH',
      });
      
      return res.status(200).json({ msg: "stripe: ", data: payout });
    }
  } catch (err) {
    console.log(err)
    if (err.kind === "ObjectId") return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({msg: "Server Error"})
  }
}

export default connectDB(handler);