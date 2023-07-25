import React from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/booknow.module.css";
import style from "../../styles/treatment.module.css";
function ContactModal(props) {
  const handleClose = () => props.setShow(false);
  return (
    <>
      <Modal show={props.show} onHide={handleClose} animation={false} size="lg" centered>
        <div
          className={`${styles.ModalHeadd} ${styles.ShadowClass} `}
          style={{
            background: "#FAFAFA",
            borderBottom: "none",
            borderRadius: "16px",
          }}
        >
          <Modal.Header
            closeButton
            style={{
              background: "#FAFAFA",
              borderBottom: "none",
              width: "95%",
              margin: "auto",

              borderRadius: "16px",
            }}
          >
            <Modal.Title>
              <span className={style.ModalHeaderr}>Support Kontaktieren</span>{" "}
            </Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body style={{ paddingLeft: "25px", paddingRight: "25px" }}>
          <div className="row mt-4 mb-5">
            <div className="col-lg-12">
              <div className={styles.Selecteddiv}>
                <div className={styles.TimeText}>
                  <img src={"/Images/csicon.png"} className={style.MessageIcon} />
                  <span> Chat</span>
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-3">
              <div className={styles.Selecteddiv}>
                <div className={styles.TimeText}>
                  <img src={"/Images/gmail.png"} className={style.MessageIcon} />
                  <span>bookings @ secretspa.co.uk</span>
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-3">
              <div className={styles.Selecteddiv}>
                <div className={styles.TimeText}>
                  <img src={"/Images/callicon.png"} className={style.MessageIcon} />
                  <span>02070960506</span>
                </div>
              </div>
            </div>
            <div className={`${style.ServiceTime}  ${style.BottomHeight} `}>
              <center>Unser Kundenservice-Team steht Ihnen täglich von 6 bis 22 Uhr zur Verfügung.</center>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none", borderRadius: "8px" }}></Modal.Footer>
      </Modal>
    </>
  );
}
export default ContactModal;
