const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dutqh6vja",
  api_key: "179616959724781",
  api_secret: "xg8K2LpLw9kQfz_obbg3-Z6QVJA",
});

const CloudinaryUploadFile = async (file, type) => {
  console.log(file);
  console.log("imageUrl2");
  if (type === "save") {
    let imageUrl = null;
    await cloudinary.uploader.upload(file, (err, uploaded) => {
      imageUrl = uploaded.url;
      console.log(imageUrl, "imageUrl");
    });
    return imageUrl;
  }

  if (type === "destroy") {
    let publicId = file.substring(file.lastIndexOf("/") + 1).split(".")[0];
    await cloudinary.uploader.destroy(publicId);
    return true;
  }
};

export default CloudinaryUploadFile;
