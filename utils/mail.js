const transporter = require("./transporter");
// var path = require("path");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config/config.env" });

module.exports = async (to, subject, content, attachments) => {
  const message = {
    from: process.env.MAIL_USERNAME, // Sender address
    to: to, // List of recipients
    subject: subject, // Subject line
    html: content,
    // attachments: attachments,
  };
  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(message);
      console.log(err);
    } else {
      console.log("email sent");
    }
  });
};
