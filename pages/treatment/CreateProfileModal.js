import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import styles from "../../styles/booknow.module.css";
import style from "../../styles/treatment.module.css";
import Box from "@mui/material/Box";
import { auth, firebase } from "../../phoneVerification";
import { Api } from "../../utils/Api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "../../Components/Loader";
var jwt = require("jsonwebtoken");
const names = [
  { item: "+92", image: "/Images/pakistani.png" },
  { item: "+966", image: "/Images/saudiArabia.png" },
  { item: "+49", image: "/Images/FlagGerman.png" },
];
function AddressModal(props) {
  const [number, setNumber] = useState();
  const [loader, setLoader] = useState(false);
  const [btnStatus, setButtonStatus] = useState(false);
  const [statusCode, setStatusCode] = useState();
  const [values, setValues] = useState();
  const handleClose = () => {
    props.setShow(false);
    setButtonStatus(false);
  };
  useEffect(() => {
    let user = window.localStorage.getItem("zolu-auth-token");
    let token = jwt.decode(user);
    setValues(token?.data?._id);
  }, []);
  const signinFirebase = () => {
    console.log("signin firebase");
    if (!statusCode) {
      alert("plz enter Code");
    } else if (!number) {
      alert("plz enter number");
    } else {
      setButtonStatus(true);
      checkNumber();
    }
  };
  const checkNumber = async () => {
    setLoader(true);
    const payload = new FormData();
    payload.append("phoneNumber", statusCode?.item + number);
    payload.append("userId", isLoggedIn && jwt.decode(isLoggedIn)?.data?._id);
    const response = await Api("post", `api/customer/check-number`, payload);
    if (response.status === 200) {
      setLoader(false);

      props?.setphoneNum(statusCode?.item + number);
      let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
      auth
        .signInWithPhoneNumber(statusCode?.item + number, verify)
        .then(async (result) => {
          if (result) {
            console.log(result, "phone number");
            props?.setfinal(result);
            props.setShow(false);
            props.setShowVerification(true);
            setButtonStatus(false);
          }
        })
        .catch((err) => {
          setButtonStatus(false);
          setLoader(false);
          alert(err);
          window.location.reload();
        });
    } else {
      setButtonStatus(false);
      setLoader(false);
      toast.warning(response?.data?.msg);
    }
  };
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("zolu-auth-token");
  console.log(statusCode, "statusCode");
  return (
    <>
      {loader ? <Loader /> : null}
      <Modal
        show={props.show}
        onHide={handleClose}
        animation={false}
        size="lg"
        centered
      >
        <div className={styles.Profilehead}>
          <Modal.Header
            closeButton
            className={`${styles.ModalHead} ${styles.ShadowClass} `}
            style={{
              borderRadius: "16px",
              paddingLeft: "4%",
              paddingRight: "4%",
            }}
          >
            <Modal.Title>
              <div className={`${styles.ModalHeadingCreateProfile}  `}>
                Profil Erstellen
              </div>{" "}
            </Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body style={{ paddingBottom: "0px" }}>
          <div className="row  m-0 p-0">
            <center>
              <div className={style.CenterText}>
                Gib deine Handynummer an, um mit der Registrierung fortzufahren
              </div>
              <div className={style.DisplayNumber} style={{ color: "#30D5C8" }}>
                <div style={{ marginTop: "30px", padding: "5px" }}>
                  <FormControl
                    sx={{
                      minWidth: 80,
                      boxShadow: "1px 3px 17px 0px #b6b4cc",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      height: "44px",
                    }}
                  >
                    <Select
                      sx={{
                        "& .MuiSvgIcon-root": { color: "#007FFF" },
                        height: "44px",
                      }}
                      value={statusCode}
                      onChange={(e) => setStatusCode(e.target.value)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <div className="d-flex">
                            <img
                              src={name.image}
                              alt="img Not found "
                              style={{
                                height: "20px",
                                width: "30px",
                                marginTop: "2px",
                                marginRight: "15px",
                              }}
                            />
                            <div>{name.item}</div>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.NumberInput}>
                  <Box sx={{ width: 500, maxWidth: "100%" }}>
                    <input
                      fullWidth
                      id="fullWidth"
                      className={styles.InputHeight}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </Box>
                </div>
              </div>
              <div
                id="recaptcha-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "7rem",
                }}
              ></div>
            </center>
            <center>
              <ZouluButton
                title="Nächster"
                className={`${styles.AddressButtonCreate}  `}
                onClick={() => {
                  !btnStatus && signinFirebase();
                }}
              />
            </center>
          </div>
          <div className={style.QuestionDiv}>
            <div className={`${style.Question} `}>
              Wieso brauchen wir deine Handynummer?
            </div>
            <div className={style.Answer}>
              Wir benötigen deine Handynummer, um dein Konto zu verifizieren und
              sicherzustellen, dass du wirklich du bist.
              <br />
              <div style={{ marginTop: "20px" }}>
                Das ist eine zusätzliche Sicherheitsmaßnahme, um die Sicherheit
                sowohl für unsere Experten als auch für unsere Kunden zu
                erhöhen.
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddressModal;
