import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import styles from "../../styles/webversionmodals.module.css";
import OTPInput from "react-otp-input";
import { Api } from "../../utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, firebase } from "../../phoneVerification";
import jwt from "jsonwebtoken";
const VerificationWebModal = (props) => {
  const { valued, profileStatus } = props;
  const handleClose = () => {
    if (props.phoneNum) {
      props.setShow(false);
      setFinalResult(null);
    }
  };
  const [OTP, setOTP] = useState("");
  const [user] = useState(
    jwt.decode(
      valued
        ? valued
        : typeof window !== "undefined"
        ? localStorage.getItem("zolu-auth-token")
        : null
    )
  );
  const [finalResult, setFinalResult] = useState(null);
  function handleChange(OTP) {
    setOTP(OTP);
  }
  const verified = () => {
    if (finalResult !== null) {
      try {
        finalResult
          .confirm(OTP)
          .then(async (result) => {
            onSubmit();
          })
          .catch((err) => {
            toast.warning("You Enter Wrong Code");
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        props?.final
          .confirm(OTP)
          .then(async (result) => {
            onSubmit();
          })
          .catch((err) => {
            toast.warning("You Enter Wrong Code");
          });
      } catch (err) {
        toast.error(err);
      }
    }
  };
  const onSubmit = async () => {
    const response = await Api(
      "get",
      `api/auth/verify/${valued ? user?.data?._id : user?.data?._id}`
    );
    if (response.status === 200) {
      localStorage.setItem("zoulu-auth-token", response.data.data);
      toast.success(response?.data?.msg);
      props.setVerifiedModal(true);
      props.setShow(false);
      setFinalResult(null);
    } else {
      toast.error(response.data.msg);
    }
  };
  const checkNumber = async () => {
    let verify = await new firebase.auth.RecaptchaVerifier(
      "recaptcha-containers"
    );
    await auth
      .signInWithPhoneNumber(
        props?.phoneNum
          ? props?.phoneNum
          : ("+" + user?.data?.phone_number)?.toString(),
        verify
      )
      .then(async (result) => {
        setFinalResult(result);
        if (result) {
          console.log(result);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Modal
      show={props.show}
      centered
      onHide={handleClose}
      animation={false}
      size="lg"
    >
      <Modal.Header
        className={styles.ModalHeaderDiv}
        style={{ borderTopRightRadius: "17px", borderTopLeftRadius: "17px" }}
      >
        <div
          className={`${styles.leftApplicationHeader} ${styles.widthHeaderText}`}
          style={{ margin: "auto" }}
        >
          <div className={styles.ModalHeaderText}>
            Mobiler Verifizierungscode
          </div>
          <div className={`${styles.ModalHeaderLevel} ${styles.TextWidth}`}>
            Wir senden Ihnen einen Code, bitte überprüfen Sie Ihre E-Mail und
            geben Sie Ihren Code ein
          </div>
        </div>
      </Modal.Header>
      <Modal.Body
        className={`${styles.leftverificationApplicationbody} ${styles.leftApplicationbody} ${styles.leftApplicationbodyHeight}`}
        style={{
          background: "#FAF7F3",
          borderBottomRightRadius: "17px",
          borderBottomLeftRadius: "17px",
        }}
      >
        <div className="row mt-5 m-0 p-0 d-flex justify-content-center">
          <div className={`col-lg-9 col-12 ${styles.AppplicationContainer}`}>
            <br />
            <div className={styles.otp}>
              <OTPInput
                onChange={handleChange}
                value={OTP}
                inputStyle="inputStyle"
                className={styles.inputStyle}
                numInputs={6}
                separator={<span></span>}
              />
            </div>
            <br />
            <div
              className="d-flex justify-content-end"
              // style={{ marginRight: "53px" }}
            >
              <div className={`${styles.RecoveryQuestion}  mt-1`}>
                Haben Sie keinen Code erhalten?{" "}
              </div>
              <div
                className={`${styles.RecoveryUnderlineText}  mt-1 `}
                style={{
                  fontFamily: "PlusJakartaSans-Medium",
                  cursor: "pointer",
                }}
                onClick={() => checkNumber()}
              >
                Code erneut senden
              </div>
            </div>
          </div>
          <div
            id="recaptcha-containers"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "7rem",
            }}
          ></div>
        </div>
      </Modal.Body>
      <Modal.Footer
        className={styles.ModalFooter}
        style={{
          // backgroundColor: progress == 25 ? "#F9F9F9" : "white",
          borderTop: "none",
          borderBottomRightRadius: "17px",
          borderBottomLeftRadius: "17px",
        }}
      >
        <ZouluButton
          title="Code einreichen "
          className={styles.ApplicationButton}
          onClick={() => verified()}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default VerificationWebModal;
