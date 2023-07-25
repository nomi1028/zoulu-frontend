import connectDB from "../../../../midleware/connectDB";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      let checkUser = await User.findOne({ _id: req.query.userId });
      if (!checkUser)
        return res
          .status(404)
          .json({ msg: `no user exists against id: ${req.query.userId}` });
      if (checkUser.verified)
        return res.status(409).json({ msg: `phone number already verified` });

      User.findOneAndUpdate(
        { _id: req.query.userId },
        { verified: true },
        { new: true },
        async (err, updatedUser) => {
          if (err)
            return res
              .status(500)
              .json({ msg: "error occurred while verifying phone number" });
          await updatedUser.populate([{ path: "profile" }]);
          jwt.sign(
            { data: updatedUser },
            "secret",
            { expiresIn: "12h" },
            async (err, token) => {
              if (err) throw err;
              return res.status(200).json({
                msg: "phone number verified successfully",
                data: token,
              });
            }
          );
        }
      );
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "invalid id format" });
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default connectDB(handler);
