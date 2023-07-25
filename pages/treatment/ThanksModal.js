import React from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../../pages/Common/ZouluButton/ZouluButton";
import styles from "../../styles/Home.module.css";
import style from "../../styles/treatment.module.css";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect } from "react";
function ThanksModal(props) {
  const handleClose = () => {
    props.setShow(false);
  };

  useEffect(() => {
    // Automatically close the modal after 8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 6000);

    // Clear the timer if the component unmounts before the timer expires
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        animation={false}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          style={{ background: "#FFFFFF" }}
          className={styles.VerificationModelHeader}
        ></Modal.Header>
        <Modal.Body style={{ background: "#FFFFFF", padding: "0" }}>
          <div className="row   m-0 p-0">
            <div className={`col-lg-12 mt-5 ${styles.CenterData}`}>
              <h2 className={`${styles.ModalHeading} mt-4`}>
                verifizieren abgeschlossen
              </h2>
              <DoneIcon className={style.ThanksDoneIcon} />
              <div className={style.ThanksText}>Vielen Dank !</div>
              <div className={style.CompleteText}>
                Ihr Verifizierungsprozess ist erfolgreich <br /> vollständig
              </div>
            </div>
            {/* <div className={style.ConditionButtonVerify}>
              <ZouluButton title="Okay" className={`${style.SignUpButtonn} mt-5 `} />
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}></Modal.Footer>
      </Modal>
    </>
  );
}
export default ThanksModal;
