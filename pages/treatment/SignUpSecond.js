import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Api } from "../../utils/Api";
import ZouluButton from "../../pages/Common/ZouluButton/ZouluButton";
import styles from "../../styles/Home.module.css";
import style from "../../styles/treatment.module.css";
import signInWithGoogle from "../../firebase";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import FacebookLogin from "../../facebookLogin";
function SignUpSecond(props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState(router.pathname !== "/webVersion" ? "customer" : "expert");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState();
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(true);
  const handleClose = () => props.setShow(false);
  useEffect(() => {
    let cart = JSON.parse(window.localStorage.getItem("zolu-cartOld")) || [];
    setCartData(cart);
  }, [props?.show]);
  const onSubmit = async () => {
    if (!name) {
      setShowToast(true);
      toast.warning("Name ist erforderlich");
      setShowToast(false);
      return;
    }
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
    const payload = new FormData();
    payload.append("name", name);
    payload.append("email", email);
    payload.append("password", password);
    payload.append("role", role);
    payload.append("type", "form");
    const response = await Api("post", `api/auth/signup`, payload);
    if (response.status === 200 || response.status === 201) {
      setShowToast(true);
      toast.success(response.data.msg);
      setShowToast(false);
      localStorage.setItem("zolu-auth-token", response?.data.token);
      let token = jwt.decode(response?.data?.token);
      props?.setValue(response?.data?.token);
      if (props?.setStatus) {
        props?.setStatus(response?.data?.token);
      }
      handleClose();
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
    } else {
      setShowToast(true);
      toast.warning(response.data.msg);
      setShowToast(false);
    }
  };
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
    payload.append("role", role);
    payload.append("type", "social");
    const response = await Api("post", `api/auth/signup`, payload);
    if (response.status === 200 || response.status === 201) {
      setShowToast(true);
      toast.success(response.data.msg);
      setShowToast(false);
      localStorage.setItem("zolu-auth-token", response?.data.token);
      let token = jwt.decode(response?.data?.token);
      props?.setValue(response?.data.token);
      if (props?.setStatus) {
        props?.setStatus(response?.data.token);
      }
      handleClose();
      if (cartData?.array?.length > 0 && token?.data?.role == "customer" && token?.data?.role == "customer") {
        if (token?.data?.address === null) {
          const payloads = new FormData();
          payloads.append(`gender`, token?.data?.gender);
          payloads.append(`address`, cartData?.address);
          payloads.append(`name`, token?.data?.name);
          payloads.append("addCertificates", false);
          const response = await Api("put", `api/profile/${token?.data?._id}`, payloads);
          console.log(response, "editData");
          if (response.status === 200) {
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
    } else {
      setShowToast(true);
      toast.warning(response.data.msg);
      setShowToast(false);
    }
  };
  const loginWithFacebook = async () => {
    const facebookResponse = await FacebookLogin();
    if (facebookResponse) {
      const formData = new FormData();
      formData.append("name", facebookResponse?.name);
      formData.append("email", facebookResponse?.email);
      formData.append("role", role);
      formData.append("type", "social");
      const response = await Api("post", `api/auth/signup`, formData);
      if (response.status === 200 || response.status === 201) {
        setShowToast(true);
        toast.success(response.data.msg);
        setShowToast(false);
        localStorage.setItem("zolu-auth-token", response?.data.token);
        let token = jwt.decode(response?.data?.token);
        props?.setValue(response?.data.token);
        props?.setStatus(response?.data.token);
        handleClose();
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
      } else {
        setShowToast(true);
        toast.warning(response.data.msg);
        setShowToast(false);
      }
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
    if (props?.setStatus) {
      props?.setStatus(response?.data?.token);
    }
    return response?.status;
  };
  return (
    <div>
      <Modal show={props.show} onHide={handleClose} animation={false} size="lg" centered>
        <div className={style.ModalHeaderDivParent}>
          <Modal.Header closeButton className={style.ModalHeaderDiv}></Modal.Header>
        </div>
        <Modal.Body className={style.ModayBody}>
          <div>
            <div className={` row mt-1 m-0 p-0`}>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                <div className={styles.ModelForm}>
                  <h2 className={`${styles.ModalHeading} mb-0`}>
                    Willkommen Bei <span style={{ color: "rgba(26, 140, 255, 1)" }}> Zoulu</span>
                  </h2>
                  <p className={`${styles.ModalSecondHeading} mb-0`}>Gib deine Datein Ein</p>
                  <div className={`${styles.InputName} ${styles.SmallMarginTop} `}>Dein Name</div>
                  <input type="text" placeholder="Name" className={`${styles.InputFields} mt-1 mb-1`} onChange={(e) => setName(e.target.value)} />
                  <div className={styles.InputName}>Deine E-Mail,</div>
                  <input type="text" placeholder="Deine E-Mail" className={`${styles.InputFields} mt-1 mb-1`} onChange={(e) => setEmail(e.target.value)} />
                  <div className={styles.InputName}>Password</div>
                  <input type="password" placeholder="Dein Passwort" className={`${styles.InputFields} mt-1 mb-1`} onChange={(e) => setPassword(e.target.value)} />
                  <ZouluButton title="Anmelden" className={styles.LoginModalBtn} onClick={() => onSubmit()} />
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
                  <div className={`${styles.ModalSignupText} `}>
                    Du hast bereits ein Konto?
                    <span
                      style={{ color: " #007FFF", paddingLeft: "1px", cursor: "pointer" }}
                      onClick={() => {
                        props.setLoginModal(true);
                        handleClose();
                      }}
                    >
                      Anmelden
                    </span>
                  </div>
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
    </div>
  );
}
export default SignUpSecond;
