import React from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";
import styles from "../../../styles/webversionmodals.module.css";
import DoneIcon from "@mui/icons-material/Done";
function ApplicationComplete(props) {
  const handleClose = () => {
    props.setShow(false);
  };
  return (
    <>
      <Modal show={props.show} centered onHide={handleClose} animation={false} size="lg">
        <div
          className={styles.BigHeader1}
          style={{
            borderTopRightRadius: "17px",
            borderTopLeftRadius: "17px",
          }}
        >
          <div className={styles.ModalHeaderText1}>Thank You Successfully Application</div>
          <div className={styles.ModalHeaderLevel1}>we will be in touch via email within 2 working days. from then you could be set up as a secret spa pro & earning within just 1 week!</div>
        </div>
        <Modal.Body className="m-0 p-0">
          <img src={"/Images/lastmodal.png"} className={styles.LastModaalImage} />
          <div className={`  ${styles.leftApplicationcompletebody} mt-4`}>
            <div className={styles.PaddingDetail}>
              <DoneIcon className={styles.OverviewDoneIcon1} />
              <div className={styles.TextDetails}>Achieve your income goals - earn up to $50 per hours!</div>
            </div>
            <div className={styles.PaddingDetail}>
              <DoneIcon className={styles.OverviewDoneIcon1} />
              <div className={styles.TextDetails}>Work when and where you choose </div>
            </div>
            <div className={styles.PaddingDetail}>
              <DoneIcon className={styles.OverviewDoneIcon1} />
              <div className={styles.TextDetails}>Cancellation policy protection </div>
            </div>
            <div className={`${styles.PaddingDetail} ${styles.PaddingBottom}`}>
              <DoneIcon className={styles.OverviewDoneIcon1} />
              <div className={styles.TextDetails}>Access to 100$ of new client</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          className={styles.LastModal}
          style={{
            borderBottomRightRadius: "17px",
            borderBottomLeftRadius: "17px",
          }}
        >
          <ZouluButton title="Continue" className={styles.ApplicationButton} onClick={() => props.setShow(false)} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ApplicationComplete;
