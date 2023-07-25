import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { Fragment, useRef } from "react";
import Recovery from "../../home/Components/recovery-modal/RecoveryModal";
import CreateProfileModal from "../../treatment/CreateProfileModal";
import { useEffect, useState } from "react";
import LoginModal from "../../home/Components/Login Modal/LoginModal";
import ResetPassword from "../../home/Components/reset-password/ResetPassword";
import { useRouter } from "next/router";
import SignUpSecondModal from "../../treatment/SignUpSecond";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
var jwt = require("jsonwebtoken");
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Api } from "../../../utils/Api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ThanksModal from "../../treatment/ThanksModal";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function Head(props) {
  const { statics, setStatic, setProfileStatus } = props;
  const [signUpSecond, setSignUpSecond] = useState(false);
  const [status, setStatus] = useState();
  const [adminpanel, setAdminpanel] = useState(true);
  const [value, setValue] = useState(null);
  const [showThanks, setShowThanks] = useState(false);
  const [cart, setCart] = useState([]);
  const [final, setfinal] = useState();
  const [phoneNum, setphoneNum] = useState();
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  useEffect(() => {
    setStatic(window.localStorage.getItem("zolu-auth-token"));
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    if (token?.data?.role === "expert") {
      setProfileStatus({
        profile: token?.data?.profile[0]?.approved === false && token?.data?.profile[0]?.treatments?.length === 0 ? true : false,
        verified: token?.data?.verified,
        isProfileApproved: !token?.data?.profile[0]?.approved && token?.data?.profile[0]?.treatments?.length > 0 ? true : false,
      });
    }
    if (token?.data?.role === "customer") {
      // getCart(token?.data?._id);
    }
  }, [value, statics]);
  const [loginModal, setLoginModal] = useState(false);
  const [expand, setexpand] = React.useState("lg");
  const [recovery, setRecovery] = useState();
  const [passwordModal, setPasswordModal] = useState(false);
  const navRef = useRef();
  const router = useRouter();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const ref = useRef();
  function StoreData() {
    localStorage.setItem("Role", adminpanel);
  }
  const logoutuser = () => {
    setProfileStatus();
    localStorage.clear();
    setValue(null);
    setStatic("aBC");
  };
  const getCart = async (user_id) => {
    setCart([]);
    if (user_id) {
      const payload = new FormData();
      payload.append("id", user_id);
      const response = await Api("get", `api/customer/cart/${user_id}`);
      if (response.status === 200) {
        setCart(response?.data?.data?.products);
      } else {
        setCart([]);
      }
    }
  };
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("zolu-auth-token");

  return (
    <Fragment>
      <Navbar key={expand} expand={expand}>
        <Container fluid className="navbarwidth">
          <Navbar.Brand>
            <Nav.Item onClick={() => router.push("/")} className="Navbarbrand" style={{ marginLeft: "11px", cursor: "pointer" }}>
              {/* <img src={"/Images/logo.png"} className="d-none d-sm-block" alt="abc"></img> */}
              <span
                // className="d-block d-sm-none"
                style={{
                  // paddingTop: "-10px",
                  marginTop: "-6px",
                  color: "#1A1A1B",
                  fontWeight: 900,
                  fontFamily: "PlusJakartaSans-Medium",
                  fontSize: "30px",
                }}
              >
                ZOULU
              </span>
            </Nav.Item>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            style={{
              border: "none ",
              outline: "none !important",
              backgroundColor: "none",
              boxShadow: "none",
            }}
          >
            <img src={"/Images/hamburger.png"} className="marginRightImage" style={{ height: "35px", width: "35px", marginBottom: "5px" }}></img>
          </Navbar.Toggle>
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                {isLoggedIn && jwt.decode(isLoggedIn)?.data?.role === "admin" ? (
                  <Nav.Item
                    onClick={() => router.push("/adminDashboard")}
                    className={`${router.pathname === "/bookNow" ? "HeadMenubottom" : ""} HeadMenu d-flex justify-content-center align-items-center`}
                  >
                    Dashboard
                  </Nav.Item>
                ) : null}
                {isLoggedIn && jwt.decode(isLoggedIn)?.data?.role === "expert" ? null : (
                  <Nav.Item onClick={() => router.push("/bookNow")} className={`${router.pathname === "/bookNow" ? "HeadMenubottom" : ""} HeadMenu d-flex align-items-center`}>
                    Behandlungen
                  </Nav.Item>
                )}
                {isLoggedIn && jwt.decode(isLoggedIn)?.data?.profile ? (
                  jwt.decode(isLoggedIn)?.data?.profile[0]?.approved ? (
                    <Nav.Item
                      className={`${router.pathname === "/dashboard" ? "HeadMenubottom" : ""} HeadMenu d-flex justify-content-center align-items-center`}
                      onClick={() => {
                        router.push("/dashboard");
                        StoreData();
                      }}
                    >
                      Dashboard
                    </Nav.Item>
                  ) : null
                ) : null}
                {isLoggedIn && jwt.decode(isLoggedIn)?.data?.role === "customer" ? (
                  <Nav.Item onClick={() => router.push("/mybooking")} className={`${router.pathname === "/mybooking" ? "HeadMenubottom" : ""} HeadMenu mt-3 d-flex `}>
                    Meine Buchung
                  </Nav.Item>
                ) : null}
                {isLoggedIn && jwt.decode(isLoggedIn)?.data?.role === "customer" ? null : (
                  <Nav.Item onClick={() => router.push("/webVersion")} className={`${router.pathname === "/webVersion" ? "HeadMenubottom" : ""} HeadMenu d-flex  align-items-center`}>
                    Experte Werden
                  </Nav.Item>
                )}
              </Nav>
              <Form className="d-flex   mblViewform " style={{ alignItems: "center" }}>
                <Nav.Item
                  style={{
                    marginRight: "0",
                    marginBottom: "7px",
                    cursor: "pointer",
                  }}
                  className="loginButton"
                >
                  {isLoggedIn && jwt.decode(isLoggedIn)?.data?.role === "customer" ? (
                    <span
                      style={{
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        paddingTop: "11px",
                        paddingBottom: "16px",
                        borderRadius: "50%",
                        background: "#FAFAFA",
                        marginRight: "20px",
                      }}
                      onClick={(e) => {
                        props?.cartLength > 0 && router.push("/treatment/TreatmentDetail");
                      }}
                    >
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={props?.cartLength && props?.cartLength} color="secondary">
                          <ShoppingCartIcon />
                        </StyledBadge>
                      </IconButton>
                    </span>
                  ) : (
                    ""
                  )}
                </Nav.Item>
                <Nav.Item style={{ marginRight: "0", cursor: "pointer" }} className="loginLogoutButton" onClick={() => (isLoggedIn ? logoutuser() : setLoginModal(true))}>
                  {isLoggedIn ? <span>Abmelden</span> : <span>Einloggen</span>}
                </Nav.Item>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {loginModal && (
        <LoginModal
          show={loginModal}
          setShow={(e) => setLoginModal(e)}
          setRecovery={(e) => setRecovery(e)}
          setSignUpSecond={(e) => setSignUpSecond(e)}
          setValue={(e) => setValue(e)}
          setStatus={(e) => setStatic(e)}
          setShowCreateProfile={(e) => setShowCreateProfile(e)}
        />
      )}
      <CreateProfileModal
        show={showCreateProfile}
        setShow={(e) => setShowCreateProfile(e)}
        setShowVerification={(e) => setShowVerification(e)}
        setfinal={(e) => setfinal(e)}
        setphoneNum={(e) => setphoneNum(e)}
      />
      {showVerification && (
        <Recovery
          show={showVerification}
          setShow={(e) => setShowVerification(e)}
          setShowThanks={(e) => setShowThanks(e)}
          final={final}
          values={isLoggedIn && jwt.decode(isLoggedIn)?.data}
          phoneNum={phoneNum}
          setStatus={(e) => setStatus(e)}
        />
      )}
      {showThanks && <ThanksModal show={showThanks} setShow={(e) => setShowThanks(e)} />}
      {/* <Recovery
        show={recovery}
        setShow={(e) => setRecovery(e)}
        setPasswordModal={(e) => setPasswordModal(e)}
      /> */}
      <ResetPassword show={passwordModal} setShow={(e) => setPasswordModal(e)} />
      {signUpSecond && (
        <SignUpSecondModal
          show={signUpSecond}
          setShow={(e) => setSignUpSecond(e)}
          setLoginModal={(e) => setLoginModal(e)}
          setValue={(e) => setValue(e)}
          setStatus={(e) => setStatic(e)}
          setShowCreateProfile={(e) => setShowCreateProfile(e)}
        />
      )}
    </Fragment>
  );
}

export default Head;
