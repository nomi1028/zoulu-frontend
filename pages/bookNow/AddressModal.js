import React from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import styles from "../../styles/booknow.module.css";
import FormControl from "@mui/material/FormControl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { Api } from "../../utils/Api";

function AddressModal(props) {
  const [values, setValues] = React.useState();
  const [value, setValue] = React.useState("");
  const [location, setLocation] = React.useState("");
  const handleClose = () => props.setShow(false);

  const handleSave = () => {
    if (!value?.label) {
      toast.warn("Plz Add Location");
    } else if (props?.manageDisplay === true) {
      localStorage.setItem("zolu-cartOld-address", value?.label);
      props.setAddress(value?.label);

      props.setShow(false);

      UpdateAdress();
    } else {
      localStorage.setItem("zolu-cartOld-address", value?.label);
      props?.setAddress(value?.label);
      props.setShow(false);
      props.setDeepTissueMassage(true);
      UpdateAdress();
    }
  };
  const UpdateAdress = async () => {
    if (props?.userID) {
      const payload = new FormData();
      payload.append("products", JSON.stringify(props?.cart));
      payload.append("address", value?.label);
      payload.append("userId", props?.userID);

      const response = await Api("post", `api/customer/cart`, payload);
      if (response.status === 200) {
      }
    } else {
      if (props?.cartData?.array) {
        const address = value?.label;
        const array = props?.cartData?.array;
        localStorage.setItem("zolu-cartOld", JSON.stringify({ address, array }));
      }
    }
  };
  return (
    <>
      <Modal centered show={props.show} onHide={handleClose} animation={false} size="lg" className={`${styles.AdressModalHeight}`}>
        <Modal.Header closeButton className={`${styles.ModalHead}  ${styles.AddressModallClass}`}>
          <Modal.Title className={styles.modalHeading}>
            <span className={styles.DeepTissueModalHeading}>Adresse hinzufügen</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <span style={{ fontSize: "14px", paddingLeft: "29px", paddingRight: "25px", marginTop: "30px" }} className={`${styles.DeepTissueModalHeading}`}>
          Standort suchen
        </span>{" "}
        <Modal.Body>
          <FormControl className={`${styles.GooglePlacesAutocomplete} mt-2`}>
            <div className="GooglePlacesAutocomplete blueArrow">
              <GooglePlacesAutocomplete
                apiKey={`${process.env.NEXT_PUBLIC_REACT_APP_MAPS_API}`}
                placeholder="Enter a location..."
                selectProps={{
                  value,
                  onChange: (e) => {
                    setValue(e);
                  },
                  placeholder: "Gib deine Wunschadresse ein…",
                }}
              />
            </div>
          </FormControl>
        </Modal.Body>
        <div className={`${styles.HeightButton}`}>
          <ZouluButton
            title="Speichern"
            className={`${styles.AddressButton} mt-3 mb-4`}
            onClick={() => {
              handleSave();
            }}
          />
        </div>
      </Modal>
    </>
  );
}
export default AddressModal;
