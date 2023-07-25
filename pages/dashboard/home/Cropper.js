import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px !important",
  borderColor: "none !important",
};
const Cropper = ({
  imageToCrop,
  croppedImage,
  setCroppedImage,
  setOpen,
  open,
}) => {
  const [crop, setCrop] = useState({
    maxHeight: 800,
    maxWidth: 400,
  });

  const [image, setImage] = useState(null);

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    const url = base64Image;
    handleUpload(url);
    // const response = await axios.get(url, { responseType: 'blob' });
    // const file = new File([response.data], 'image.jpg', { type: 'image/jpeg' });

    setOpen(false);
  };
  const handleUpload = async (url) => {
    try {
      // Convert base64 to Blob

      const response = await axios.get(url, { responseType: "blob" });
      const file = new File([response.data], "image.jpg", {
        type: "image/jpeg",
      });
      setCroppedImage({
        ...croppedImage,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
      console.log(file, "fileeeee");
      // Create a FormData object
      // Replace with your Cloudinary upload preset

      // Send POST request to Cloudinary upload endpoint

      // Get the uploaded image URL from the Cloudinary response

      // Do something with the image URL (e.g., display it in an <img> element)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {imageToCrop && (
          <div>
            <ReactCrop
              src={imageToCrop}
              onImageLoaded={setImage}
              maxHeight={600}
              maxWidth={600}
              crop={crop}
              onChange={setCrop}
            />
            <br />
            <Button
              onClick={cropImageNow}
              style={{
                marginTop: "10px",
                background: "#007fff",
                color: "white",
              }}
            >
              Done
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default Cropper;
