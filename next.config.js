module.exports = {
  env: {
    mongodburl:
      "mongodb+srv://Admin:Admin@db.e6le9.mongodb.net/zoulu?retryWrites=true&w=majority",
    jwtKey: "thehina",
    env: "production",
  },
  images: { unoptimized: true },
  distDir: "build",
  swcMinify: false,
};
