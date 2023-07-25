const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");

// dotenv.config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
  //   host: "aetmaad.com",
  //   service: "SMTP",
  //   port: 465,
  //   debug: true,
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports = transporter;
