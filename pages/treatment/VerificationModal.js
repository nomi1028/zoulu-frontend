import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../../pages/Common/ZouluButton/ZouluButton";
import styles from "../../styles/Home.module.css";
function Verification(props) {
  const handleClose = () => props.setShow(false);
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        animation={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton style={{ background: "#FFF" }}>
          <Modal.Title className={styles.VerificationModeltitle}> </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FFF", padding: "0" }}>
          <div className="row mt-1  m-0 p-0">
            <div className={`col-lg-12 `}>
              <div className={styles.VerificationModel}>
                <div>
                  <h2 className={styles.ModalHeading}>verification</h2>
                </div>
                <br />
                <div
                  className={styles.InputModelVerification}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0",
                  }}
                >
                  <input
                    className={styles.RecoveryCode1}
                    type="number"
                    placeholder=""
                  />
                  <input
                    className={styles.RecoveryCode1}
                    type="number"
                    placeholder=""
                  />
                  <input
                    className={styles.RecoveryCode1}
                    type="number"
                    placeholder=""
                  />
                  <input
                    className={styles.RecoveryCode1}
                    type="number"
                    placeholder=""
                  />
                </div>
                <div className={styles.VerificationAllText}>
                  <span className={styles.VerificationText}>
                    {" "}
                    Didn’t you receive any code?{" "}
                  </span>
                  <div className={styles.RecoveryUnderlineText}>
                    Code erneut senden
                  </div>
                </div>
              </div>
              <ZouluButton
                title="Submit Code"
                className={styles.RecoveryModalBtn}
                onClick={() => {
                  props.setShowThanks(true);
                  props.setShow(false);
                }}
              />
              <br />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: "none", borderRadius: "8px" }}
        ></Modal.Footer>
      </Modal>
    </>
  );
}
export default Verification;
