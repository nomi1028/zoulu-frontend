import React from "react";
import { Modal } from "react-bootstrap";
import style from "../../../styles/treatment.module.css";
const CustomDeleteModal = (props) => {
  return (
    <Modal show={props.showModal} onHide={props.hideModal} animation={false} size="md" centered>
      <Modal.Header closeButton className={style.ModalHeaderDiv}>
        <h4>{props?.title}</h4>
      </Modal.Header>
      <Modal.Body className={style.ModayBody}>
        <div className="hodTitle-subTitle-margin">
          <div className="dashboard-modal-subtitle mt-4">{props?.subTitle}</div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div className="cancel-expert-btn" onClick={props.hideModal}>
            {props?.btnTitle ? "Schließen" : "Schließen"}
          </div>
          <div className={props?.btnTitle === "Confirm" || props?.btnTitle === "Unblock" ? "confirm-expert-btn" : "reject-expert-btn"} style={{ marginLeft: "10px" }} onClick={props.callback}>
            {props?.btnTitle ? props?.btnTitle : "Löschen"}
            {/* {props?.btnTitle ? props?.btnTitle : "Delete"} */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}></Modal.Footer>
    </Modal>
  );
};

export default CustomDeleteModal;
