const { MongoClient } = require("mongodb");
const nextConfig = require("./next.config");
const moment = require("moment");

const user = {
  name: "super admin",
  email: "admin@zoulu.com",
  phone_number: null,
  password: "$2a$10$6wuqZg4nCxBYRFJbqJfiI.QwqfYvYtoh2HQnjJZOMHljjpOinw36G",
  role: "admin",
  verified: true,
  image: null,
  address: null,
  stripe_customer_id: null,
  gender: "notSpecified",
  created_at: moment().format(),
  updated_at: moment().format(),
};

const connectDB = async () => {
  const client = await MongoClient.connect(nextConfig.env.mongodburl, { useUnifiedTopology: false, useNewUrlParser: true });
  return client;
};
const seedDB = async () => {
  try {
    // Drop existing zoulu collection if -d flag is passed
    if (process.argv[2] === "-d") {
      const client = await connectDB();
      await client.db().dropDatabase();
      console.log("Zoulu collection dropped");
      process.exit();
    }

    // Insert zoulu data if -i flag is passed
    if (process.argv[2] === "-i") {
      const client = await connectDB();
      console.log("db connected");
      await client.db().collection("users").insertOne(user);
      console.log("Zoulu data inserted");
      process.exit();
    }
    console.log("Invalid command");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

seedDB();
