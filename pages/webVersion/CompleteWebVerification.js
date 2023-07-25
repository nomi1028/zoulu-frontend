import React from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import styles from "../../styles/webversionmodals.module.css";
import style from "../../styles/Home.module.css";
import DoneIcon from "@mui/icons-material/Done";
function YourApplication(props) {
  const handleClose = () => {
    props.setShow(false);
    props?.setValued(false);
    props?.setShowApplicationModal(true);
    props?.setProgress(50);
  };
  return (
    <>
      <Modal show={props.show} centered onHide={handleClose} animation={false} size="lg">
        <Modal.Header className={styles.ModalHeaderDivCenter} style={{ borderTopRightRadius: "17px", borderTopLeftRadius: "17px" }}>
          <center>
            <div className={`${styles.ModalHeaderTextComplete} `}>Verifizierung abgeschlossen</div>
          </center>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "#FAF7F3",
            borderBottomRightRadius: "17px",
            borderBottomLeftRadius: "17px",
          }}
          className=""
        >
          <div className="row mt-5  m-0 p-0">
            <div className={`col-lg-12 ${style.CenterData}`}>
              <DoneIcon className={styles.ThanksDoneIcon} />
              <div className={styles.VerifiedThanksText}>Vielen Dank!</div>
              <div className={`${styles.VerifiedTexts} mt-3`}>Ihr Verifizierungsprozess wurde erfolgreich abgeschlossen </div>
              <ZouluButton title="Fortsetzen" className={styles.ApplicationButton} onClick={() => handleClose()} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default YourApplication;
