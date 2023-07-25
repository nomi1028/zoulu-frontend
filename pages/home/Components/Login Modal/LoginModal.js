import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Api } from "../../../../utils/Api";
import ZouluButton from "../../../Common/ZouluButton/ZouluButton";
import styles from "../../../../styles/Home.module.css";
import style from "../../../../styles/treatment.module.css";
import signInWithGoogle from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var jwt = require("jsonwebtoken");
import { useRouter } from "next/router";
import FacebookLogin from "../../../../facebookLogin";
import Loader from "../../../../Components/Loader";
import { Form } from "react-bootstrap";
function SignUpSecond(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [cartData, setCartData] = useState();
  const [showToast, setShowToast] = useState(false);
  const [password, setpassword] = useState("");
  const [showmodal, setshowmodal] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleClose = () => props.setShow(false);
  const onSubmit = async () => {
    if (!email) {
      setShowToast(true);
      toast.warning("E-Mail ist erforderlich");
      setShowToast(false);
      return;
    }
    if (!password) {
      setShowToast(true);
      toast.warning("Passwort wird benötigt");
      setShowToast(false);
      return;
    }
    setLoading(true);

    const payload = new FormData();
    payload.append("email", email);
    payload.append("password", password);
    const response = await Api("post", `api/auth/signin`, payload);
    if (response.status === 200) {
      setLoading(false);

      setShowToast(true);
      toast.success(response?.data?.msg);
      setShowToast(false);
      let token = jwt.decode(response?.data.token);
      localStorage.setItem("zolu-auth-token", response?.data.token);
      localStorage.setItem("zolu-auth-token-expert", response?.data.token);
      props?.setValue(response?.data.token);
      props?.setStatus(response?.data.token);
      if (token?.data?.profile[0]?.approved) {
        router.push("/dashboard");
      } else if (token?.data?.role === "admin") {
        router.push("/adminDashboard/");
      } else if (token?.data?.role === "expert") {
        router.push("/webVersion");
      }
      if (cartData?.array?.length > 0 && token?.data?.role == "customer") {
        if (token?.data?.address === null) {
          const payloads = new FormData();

          payloads.append(`gender`, token?.data?.gender);
          payloads.append(`address`, cartData?.address);
          payloads.append(`name`, token?.data?.name);
          payloads.append("addCertificates", false);
          const response = await Api("put", `api/profile/${token?.data?._id}`, payloads);
          console.log(response, "editData");
          if (response.status === 200) {
            // getUserData(values);
          } else {
            alert("error");
          }
        }
        handlerCarts(cartData, token?.data?._id);
        if (token?.data?.verified == false) {
          handleClose();
          props?.setShowCreateProfile(true);
        } else if (router.pathname !== "/treatment/TreatmentDetail") {
          router.push("/treatment/TreatmentDetail");
        }
        localStorage.removeItem("zolu-cartOld");
        handleClose();
        localStorage.removeItem("zolu-cartOld-address");
      } else {
        if (token?.data?.verified == false && token?.data?.role == "customer") {
          handleClose();
          props?.setShowCreateProfile(true);
          setLoading(false);
        } else {
          setLoading(false);
          props.setShow(false);
        }
      }
    } else {
      setLoading(false);
      setShowToast(true);
      toast.warning(response.data?.msg);
      setShowToast(false);
    }
  };
  useEffect(() => {
    let cart = JSON.parse(window.localStorage.getItem("zolu-cartOld")) || [];
    setCartData(cart);
  }, [props?.show]);

  const signIngoogle = async () => {
    setLoading(true);
    const user = await signInWithGoogle();

    if (!user) {
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append("name", user.displayName);
    payload.append("email", user.email);
    payload.append("role", "customer");
    payload.append("type", "social");
    const response = await Api("post", `api/auth/signup`, payload);
    if (response.status === 200 || response.status === 201) {
      setShowToast(true);
      toast.success(response.data?.msg);
      setShowToast(false);
      let token = jwt.decode(response?.data?.token);
      localStorage.setItem("zolu-auth-token", response?.data?.token);
      props?.setValue(response?.data.token);
      props?.setStatus(response?.data.token);
      setLoading(false);
      if (cartData?.array?.length > 0 && token?.data?.role == "customer") {
        if (token?.data?.address === null) {
          const payloads = new FormData();
          payloads.append(`gender`, token?.data?.gender);
          payloads.append(`address`, cartData?.address);
          payloads.append(`name`, token?.data?.name);
          payloads.append("addCertificates", false);
          const response = await Api("put", `api/profile/${token?.data?._id}`, payloads);
          console.log(response, "editData");
          if (response.status === 200) {
            // getUserData(values);
          } else {
            alert("error");
          }
        }

        handlerCarts(cartData, token?.data?._id);
        if (token?.data?.verified == false && token?.data?.role == "customer") {
          handleClose();
          props?.setShowCreateProfile(true);
        } else if (router.pathname !== "/treatment/TreatmentDetail") {
          router.push("/treatment/TreatmentDetail");
        }

        localStorage.removeItem("zolu-cartOld");
        handleClose();
        localStorage.removeItem("zolu-cartOld-address");
      } else {
        if (token?.data?.verified == false && token?.data?.role == "customer") {
          handleClose();
          props?.setShowCreateProfile(true);
          setLoading(false);
        } else {
          setLoading(false);
          props.setShow(false);
        }
      }
    } else {
      setLoading(false);
      setShowToast(true);
      toast.warning(response.data?.msg);
      setShowToast(false);
    }
  };
  const handlerCarts = async (data, userID) => {
    console.log(data, userID, "userID");
    const payload = new FormData();
    payload.append(
      "products",
      JSON.stringify(
        data?.array?.map((e) => ({
          ...e,
          packages: e?.packages?.map((ele) => ({
            package_id: ele?.package_id?._id,
          })),
          service_id: e?.service_id._id,
        }))
      )
    );
    payload.append("address", data?.address);
    payload.append("userId", userID);
    const response = await Api("post", `api/customer/cart`, payload);
    props?.setStatus(response?.status);
    return response?.status;
  };
  const loginWithFacebook = async () => {
    const facebookResponse = await FacebookLogin();
    if (facebookResponse) {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", facebookResponse?.name);
      formData.append("email", facebookResponse?.email);
      formData.append("role", "customer");
      formData.append("type", "social");
      const response = await Api("post", `api/auth/signup`, formData);
      if (response.status === 200 || response.status === 201) {
        setShowToast(true);
        toast.success(response?.data?.msg);
        setShowToast(false);
        let token = jwt.decode(response?.data.token);
        localStorage.setItem("zolu-auth-token", response?.data.token);
        props?.setValue(response?.data.token);
        props?.setStatus(response?.data.token);
        if (cartData?.array?.length > 0 && token?.data?.role == "customer") {
          if (token?.data?.address === null) {
            const payloads = new FormData();
            payloads.append(`gender`, token?.data?.gender);
            payloads.append(`address`, cartData?.address);
            payloads.append(`name`, token?.data?.name);
            payloads.append("addCertificates", false);
            const response = await Api("put", `api/profile/${token?.data?._id}`, payloads);
            console.log(response, "editData");
            if (response.status === 200) {
              // getUserData(values);
            } else {
              alert("error");
            }
          }
          handlerCarts(cartData, token?.data?._id);

          if (token?.data?.verified == false) {
            handleClose();
            props?.setShowCreateProfile(true);
          } else if (router.pathname !== "/treatment/TreatmentDetail") {
            router.push("/treatment/TreatmentDetail");
          }
          localStorage.removeItem("zolu-cartOld");
          handleClose();
          localStorage.removeItem("zolu-cartOld-address");
        } else {
          if (token?.data?.verified == false) {
            handleClose();
            props?.setShowCreateProfile(true);
            setLoading(false);
          } else {
            setLoading(false);
            props.setShow(false);
          }
        }
        setLoading(false);
      } else {
        setLoading(false);
        setShowToast(true);
        toast.warning(response?.data?.message);
        setShowToast(false);
      }
    }
  };
  const sendEmail = async () => {
    const payload = new FormData();
    payload.append("email", email);
    const response = await Api("post", `api/forgetPassword`, payload);
    if (response.status === 200) {
      toast.success(response.data?.msg);
      setshowmodal(true);
    } else {
      toast.warning(response.data?.msg);
    }
  };
  const passwordHandler = () => {
    return (
      <>
        <Modal show={props.show} onHide={handleClose} animation={false} size="lg" centered>
          <div className={style.ModalHeaderDivParent}>
            <Modal.Header closeButton className={style.ModalHeaderDiv}></Modal.Header>
          </div>
          <Modal.Body className={style.ModayBody}>
            <div>
              <div className={` row mt-1  m-0 p-0`}>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                  <div className={styles.ModelForm}>
                    <h2 className={styles.ModalHeading}>Passowrd vergessen</h2>
                    <p className={styles.ModalSecondHeading}> {/* Gib deine Datein Ein */}</p>
                    <div className={`${styles.InputName} ${styles.SmallMarginTop} `}>E-Mail-Adresse</div>
                    <input type="email" placeholder="Enter Email Address" className={styles.InputFields} style={{ backgroundColor: "transparent" }} onChange={(e) => setEmail(e.target.value)} />
                    <p className="forgetPassword" onClick={() => setshowmodal(true)}>
                      Einloggen?
                    </p>

                    <ZouluButton title="Senden" className={styles.LoginModalBtn} onClick={() => sendEmail()} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  " style={{ textAlign: "end" }}>
                  <img src={"/Images/Abstract.png"} className={style.SignUpRightPic} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ borderRadius: "16px", border: "none" }}></Modal.Footer>
        </Modal>
      </>
    );
  };
  const loginModal = () => {
    return (
      <>
        <Modal show={props.show} onHide={handleClose} animation={false} size="lg" centered>
          <div className={style.ModalHeaderDivParent}>
            <Modal.Header closeButton className={style.ModalHeaderDiv}></Modal.Header>
          </div>
          <Modal.Body className={style.ModayBody}>
            <div>
              <div className={` row mt-1  m-0 p-0`}>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                  <div className={styles.ModelForm}>
                    <h2 className={styles.ModalHeading}>
                      Willkommen <span style={{ color: "rgba(26, 140, 255, 1)" }}>Zurück</span>
                    </h2>
                    <p className={styles.ModalSecondHeading}> Gib deine Datein Ein</p>
                    <div className={`${styles.InputName} ${styles.SmallMarginTop} `}>Deine E-Mail</div>
                    <input type="email" placeholder="Deine E-Mail" className={styles.InputFields} style={{ backgroundColor: "transparent" }} onChange={(e) => setEmail(e.target.value)} />

                    <input
                      type="password"
                      placeholder="Dein Passwort"
                      className={`${styles.InputFields} mt-2`}
                      style={{ backgroundColor: "transparent" }}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    <p className="forgetPassword" onClick={() => setshowmodal(false)}>
                      Passwort vergessen?
                    </p>

                    <ZouluButton title="Anmelden" className={styles.LoginModalBtn} onClick={() => onSubmit()} />
                    {router.pathname === "/webVersion" ? null : (
                      <>
                        <div className="mt-2" style={{ alignItems: "center", display: "flex" }}>
                          <div className={styles.BorderBottom}></div>
                          <div className={styles.SignUpOR}>oder</div>
                          <div className={styles.BorderBottom}></div>
                        </div>
                        <div className={`${styles.InputFields} ${style.SignupMedia} mt-2`} onClick={() => signIngoogle()} style={{ cursor: "pointer" }}>
                          <img src={"/Images/signupgoogle.png"} className={style.SignupGoogleImg} />
                          <span className={style.SocialMediaText}>Mit Google Anmelden</span>
                        </div>
                        <div className={` ${style.SignupMedia} ${styles.FaceookContainer} ml-2`} onClick={() => loginWithFacebook()} style={{ cursor: "pointer" }}>
                          <img src={"/Images/facebook-white.png"} className={`${style.SignupGoogleImg}  `} />
                          <span className={style.SocialMediaText} style={{ color: "white" }}>
                            Mit Facebook
                          </span>
                        </div>
                        <br />
                        <div className={`${styles.ModalSignupText}  `}>
                          Du hast kein Konto?
                          <span
                            style={{ cursor: "pointer" }}
                            className={styles.SignUpText}
                            onClick={() => {
                              props.setSignUpSecond(true);
                              handleClose();
                            }}
                          >
                            {"  "}Jetzt Registrieren!
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  " style={{ textAlign: "end" }}>
                  <img src={"/Images/login.png"} className={style.SignUpRightPic} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ borderRadius: "16px", border: "none" }}></Modal.Footer>
        </Modal>
      </>
    );
  };
  return (
    <div>
      {loading ? <Loader /> : null}
      {showmodal ? loginModal() : passwordHandler()}
    </div>
  );
}
export default SignUpSecond;
