const jwt = require("jsonwebtoken");
import Signup from "../models/User";

module.exports = (handler) => async (req, res) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      const { data } = jwt.decode(token);
      const { user } = data;
      const { _id } = user;
      const response = await Signup.findOne({ _id: _id });
      return handler(req, res, response);
    } catch (err) {
      return res.status(401).json({ status: false, message: "Un Autherized" });
    }
  } else {
    return res.status(403).json({ status: false, message: "Auth token is not supplied" });
  }
};
