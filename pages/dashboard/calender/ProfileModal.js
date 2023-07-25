import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function BasicModal(props) {
  const handleClose = () => props.setOpen(false);
  console.log(props.data?.userData?.address, "haneef");

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{
              textAlign: "center",
              color: "#0d6efd",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Buchungsdetails
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="p"
            component="p"
            style={{
              // color: "#0d6efd",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Behandlung:
          </Typography>
          <span>{props.data?.title}</span>
          <Typography
            id="modal-modal-title"
            variant="p"
            component="p"
            style={{
              // color: "#0d6efd",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Kunde:
          </Typography>
          <span>{props.data?.userData?.name}</span>
          <Typography
            id="modal-modal-title"
            variant="p"
            component="p"
            style={{
              // color: "#0d6efd",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Adresse:
          </Typography>
          <span>{props.data?.userData?.address}</span>
        </Box>
      </Modal>
    </div>
  );
}
