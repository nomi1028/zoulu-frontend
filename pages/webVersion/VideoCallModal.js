import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../../pages/Common/ZouluButton/ZouluButton";
import styles from "../../styles/webversionmodals.module.css";
import { TiVideo } from "react-icons/ti";
function VideoCall(props) {
  const handleClose = () => props.setShow(false);

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        animation={false}
        size="md"
        style={{ border: "none" }}
        className="m-0 p-0"
      >
        <Modal.Body
          // style={{ backgroundColor: "black" }}
          className={`${styles.CallContainer} m-0 p-0 `}
        >
          <div className="m-0 p-0">
            <div className={styles.VideoHeaderText}>
              <div className={styles.VideoHeadText}>SECRET SPA</div>
              <div className={styles.VideoSecondHead}> PROFESSIONAL</div>
            </div>
            <div className={styles.VidelCallContainer}>
              <ZouluButton
                title="Apply Now"
                className={styles.CallButton11}
                onClick={() => {
                  props.setShow(false);
                  props.setShowApplicationModal(true);
                }}
              />
              <img
                src={"/Images/videocallicon.png"}
                className={styles.CallIcon}
              />

              {/* <TiVideo className={styles.CallIcon} /> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default VideoCall;
