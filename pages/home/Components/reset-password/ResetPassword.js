import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../../../Common/ZouluButton/ZouluButton";
import styles from "../../../../styles/Home.module.css";
function ResetPassword(props) {
  const handleClose = () => props.setShow(false);
  return (
    <>
      <Modal show={props.show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header
          closeButton
          style={{
            background: "#FAF7F3",
            borderBottom: "none",
            paddingTop: "30px",
            paddingRight: "25px",
          }}
        >
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FAF7F3" }}>
          <div className="row mt-5  m-0 p-0">
            <div className="col-lg-12 ">
              <div className={styles.ResPasPadding}>
                <h2 className={styles.ModalHeading}>Create New Password</h2>
                <p className={`${styles.NewPasswordSecondHeading} pb-4`}>please enter your new password</p>
                <span className={`${styles.InputLabel}`}>New Password</span>
                <br />
                <input style={{ backgroundColor: "transparent" }} type="password" placeholder="*********" className={`${styles.InputFieldsResetPassword}  mt-3 mb-2`} />
                <br />
                <br />
                <span className={styles.InputLabel}>Confirm New Password</span>
                <br />
                <input style={{ backgroundColor: "transparent" }} type="password" placeholder=" *********" className={`${styles.InputFieldsResetPassword}  mt-3`} />
                <br />
              </div>
            </div>
            <div className={`${styles.CenterData} ${styles.BottomTopMargin} `}>
              <ZouluButton title="Continue" className={styles.ResPasModalBtn} onClick={handleClose} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ResetPassword;
