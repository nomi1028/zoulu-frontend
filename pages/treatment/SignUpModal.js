import React from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import styles from "../../styles/booknow.module.css";
import style from "../../styles/treatment.module.css";
import styled from "../../styles/webversionmodals.module.css";
import { Row, Col } from "reactstrap";
function SignUpModal(props) {
  const handleClose = () => props.setShow(false);
  return (
    <>
      <Modal show={props.show} onHide={handleClose} animation={false} size="lg" style={{ borderRadius: "16px" }} centered>
        <div className={style.ModalHeaderDivParent}>
          <Modal.Header className={style.ModalHeaderDiv}></Modal.Header>
        </div>
        <Modal.Body className={style.ModayBody}>
          <div className={styled.ContactText}>Card information</div>
          <Row className="mt-4">
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${styled.InputLabel} mt-4  `}>Card Holder Name</div>
              <input fullWidth id="fullWidth" className={styled.SimpleInputDesign} />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${styled.InputLabel} mt-4  `}>Card Number</div>
              <input fullWidth id="fullWidth" className={styled.SimpleInputDesign} type={"number"} />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${styled.InputLabel} mt-4  `}>Expire Date</div>
              <input fullWidth id="fullWidth" type="month" className={styled.SimpleInputDesign} />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${styled.InputLabel} mt-4  `}>CVC</div>
              <input fullWidth id="fullWidth" placeholder="---" className={styled.SimpleInputDesign} />
            </Col>
          </Row>
          <ZouluButton className={`${styles.PaymentButton} mt-5 `} title="Submit" />
        </Modal.Body>
        <Modal.Footer style={{ borderRadius: "16px", border: "none" }}></Modal.Footer>
      </Modal>
    </>
  );
}
export default SignUpModal;
