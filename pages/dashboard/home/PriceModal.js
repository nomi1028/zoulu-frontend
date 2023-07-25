import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";

import styles from "../../../styles/Home.module.css";
function PriceModal(props) {
  console.log(props?.category);
  const handleClose = () => props.setShow(false);
  return (
    <>
      <Modal
        show={props?.show}
        onHide={handleClose}
        animation={false}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          style={{
            background: "#FFF",
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
          }}
        >
          <Modal.Title className={styles.VerificationModeltitle}>
            {" "}
            TEXT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#FFF", padding: "0" }}>
          <div className="row mt-1  m-0 p-0">
            <div className={`col-lg-12 `}>
              <div>
                {[1, 2]?.map((value, i) => {
                  return (
                    <>
                      <p>Service Name</p>
                      <div className="row mt-1  m-0 p-0">
                        {[1, 2, 3, 4, 4]?.map((data, key) => {
                          return (
                            <>
                              <div className={`col-lg-6 mt-2`}>Package </div>
                              <div className={`col-lg-6 mt-2`}>
                                <input></input>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
              <ZouluButton
                title="Submit "
                className={styles.RecoveryModalBtn}
                onClick={() => {
                  //   props.setShowThanks(true);
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
export default PriceModal;
