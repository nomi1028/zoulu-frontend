import React, { useState } from "react";
import styles from "../../styles/treatment.module.css";
import style from "../../styles/booknow.module.css";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import DateSlider from "./DateSlider";
import DateTimeSlider from "./DateTimeSlider";
import ProfileSlider from "./ProfileSlider";
import CreateProfileModal from "./CreateProfileModal";
import ThanksModal from "./ThanksModal";
import LoginModal from "../home/Components/Login Modal/LoginModal";
import SignUpSecondModal from "../treatment/SignUpSecond";
import ContactModal from "./ContactModal";
import Recovery from "../home/Components/recovery-modal/RecoveryModal";
import { useEffect } from "react";
import { Api } from "../../utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var jwt = require("jsonwebtoken");
import { useRouter } from "next/router";
import Loader from "../../Components/Loader";
import { IoIosArrowBack, IoMdCart } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
const TreatmentDetail = () => {
  const router = useRouter();
  const [final, setfinal] = useState();
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [values, setValues] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [signUpSecond, setSignUpSecond] = useState(false);
  const [phoneNum, setphoneNum] = useState();
  const [cart, setCart] = useState();
  const [status, setStatus] = useState();
  const [value, setValue] = useState();
  const [totalcharge, setTotalCharge] = useState(0);
  const [address, setAdress] = useState();
  const [verified, setverified] = useState();
  const [loader, setLoader] = useState(false);
  const [location, setLocation] = useState();
  const [availableExpertt, setAvailableExpert] = useState();
  const [stripe_customer_id, setStripe_customer_id] = useState();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleChange = (panel) => {
    setServices();
    if (panel === expanded) return setExpanded(false);
    else setExpanded(panel);
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 601) {
      setShowModal(false);
    }
  }, [showModal, typeof window !== "undefined" && window.innerWidth]);
  useEffect(() => {
    let user = window.localStorage.getItem("zolu-auth-token");
    let token = jwt.decode(user);
    setValues(token?.data);
    getUser(token?.data?._id);
    if (user == null) {
      let cartData =
        JSON.parse(window.localStorage.getItem("zolu-cartOld")) || [];

      setCart(cartData?.array);

      setAdress(cartData?.address);
      getLatLngFromAddress(cartData?.address);
    }
  }, [status, value]);
  useEffect(() => {
    let amount = 0;
    cart
      ?.filter((item, index) => {
        if (item) {
          return item;
        }
      })
      .map((data, value) => {
        amount = amount + data?.charges;

        setTotalCharge(amount);
      });
  }, [cart]);
  useEffect(() => {
    getCart();
  }, [values, value]);
  const handlebooking = (profile) => {
    if (!values) {
      setLoginModal(!loginModal);
    } else if (verified === false) {
      setShowCreateProfile(!showCreateProfile);
    } else {
      let data = cart?.find((data, index) => {
        if (!data?.expert_id) {
          return data;
        }
      });
      if (data !== undefined) {
        toast.warning("Select all Services");
      } else if (data == undefined) {
        // if (!stripe_customer_id) {
        router.push("/paymentMethood");
        // } else {
        // booking("booking");
        // }
      }
    }
  };
  const booking = async (profile) => {
    let servicesBooked = [];
    let expert = [];
    let startTime = [];
    let date = [];
    if (values?._id) {
      setLoader(true);
      const payload = new FormData();
      payload.append("userId", values?._id);
      payload.append("products", JSON.stringify(cart));
      payload.append("address", address);
      if (profile !== "profile") {
        payload.append("checkout", true);
      }
      const response = await Api("post", `api/customer/cart`, payload);
      if (response.status == 200) {
        setLoader(false);
        if (profile != "profile") {
          toast.success(response?.data?.msg);
          router.push("/Success");
        }
        setShowModal(true);
      } else {
        toast.warning(response?.data?.msg);
        setLoader(false);
      }
    } else {
      localStorage.setItem(
        "zolu-cartOld",
        JSON.stringify({ address, array: cart })
      );
      setShowModal(true);
    }
  };
  const getLatLngFromAddress = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyC7Jz78vSl5-mHKv4eBOy1fRhmoph6loMA`
    );
    const data = await response.json();
    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    setLocation({ lat: lat, long: lng });
  };
  const getCart = async () => {
    setLoader(true);
    if (values?._id) {
      const payload = new FormData();
      payload.append("id", values?._id);
      const response = await Api("get", `api/customer/cart/${values?._id}`);
      if (response?.status === 200) {
        setCart(response?.data?.data?.products);
        setAdress(response?.data?.data?.address);
        setLoader(false);
        getLatLngFromAddress(response?.data?.data?.address);
      } else {
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };
  const handlerRemoveCart = async (id, index) => {
    setLoader(true);
    if (values?._id) {
      const payload = new FormData();
      payload.append("userId", values?._id);
      payload.append("productId", id);
      const response = await Api("put", `api/customer/cart`, payload);
      if (response.status === 200) {
        const array = cart?.filter((data, i) => i !== index);

        setCart([...array]);
        if (array.length < 1) {
          router.push("/bookNow");
        }
        setLoader(false);
        toast.success("Service Removed Successfully");
      } else {
        setLoader(false);
        toast.success(response.data.msg);
      }
    } else if (!values?._id) {
      const array = cart?.filter((data, i) => i !== index);
      localStorage.setItem("zolu-cartOld", JSON.stringify({ address, array }));

      setCart([...array]);
      if (array.length < 1) {
        router.push("/bookNow");
      }
      setLoader(false);
      toast.success("Service Removed Successfully");
    }
  };
  const getUser = async (id) => {
    if (id) {
      const payload = new FormData();
      payload.append("id", values?._id);
      const response = await Api("get", `api/profile/${id}`);
      if (response?.status === 200) {
        setverified(response?.data?.data?.verified);
        setStripe_customer_id(response?.data?.data?.stripe_customer_id);
      } else {
      }
    }
  };
  const routeHandler = () => {
    router.push("/bookNow");
  };
  console.log(cart, "cart");
  const getFirstCharacter = (name) => {
    const regex = /^(\w+)\s*(\w)?\w*$/;
    const matches = regex.exec(name);
    const firstLetterFirstName = matches[1][0];
    const firstLetterLastName = matches[2] ? matches[2] : "";
    return firstLetterLastName
      ? firstLetterFirstName + "." + firstLetterLastName
      : firstLetterFirstName;
  };
  return (
    <>
      {loader ? <Loader /> : null}
      <div
        className="container-fluid "
        style={{ width: "100%", padding: "0px" }}
      >
        <div
          className="row "
          style={{ width: "100%", margin: "0px", padding: "0px" }}
        >
          <div className="col-xl-8 col-lg-12  col-md-12 col-sm-12 p-0 ">
            {cart?.map((data, key) => {
              return (
                <div key={key}>
                  <div
                    className="row mb-3  pt-4"
                    style={{
                      paddingBottom: "20px",
                      marginTop: "2rem",
                      width: "80%",
                      margin: "auto",
                    }}
                  >
                    <div className="col-lg-6  col-md-12">
                      <div className={styles.SelectText}>
                        <img
                          src={"/Images/lefticon.png"}
                          className={styles.SelectIcon}
                          onClick={(e) => {
                            routeHandler();
                          }}
                        />
                        <div>
                          <span
                            onClick={(e) => {
                              routeHandler();
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            Experte Wählen
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-12 ">
                      <div className={styles.SelectTextSecond}>
                        <div
                          className={` ${styles.BorderLine} text-capitalize`}
                        >
                          {data?.service_id?.name || data?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.RowManageClass} row`}
                    style={{ position: "relative" }}
                  >
                    <DateSlider
                      setBookingExpert={(e) => {
                        {
                          e === undefined
                            ? delete cart[key].expert_id
                            : (cart[key].expert_id = e?.user_id?._id);
                          cart[key].expert_Data = e?.user_id;
                        }
                        setCart([...cart]);
                      }}
                      setBookingDate={(e) => {
                        cart[key].selectedDate = e;
                        setCart([...cart]);
                      }}
                      setAvailableExpert={(e) => {
                        setAvailableExpert(e);
                        cart[key].availableExpert = e;
                        setCart([...cart]);
                      }}
                      setBookingTime={(e) => {
                        {
                          e === undefined
                            ? delete cart[key].start_time
                            : (cart[key].start_time = e);
                        }
                        setCart([...cart]);
                      }}
                      setDate={(e) => {
                        cart[key].date = e;
                        setCart([...cart]);
                      }}
                      setExpert={(e) => {
                        cart[key].expertProfile = e;
                        setCart([...cart]);
                      }}
                      cart={cart[key]}
                      value={data}
                      location={location}
                    />
                  </div>
                  <br />
                  {cart[key].date ? (
                    <div className={`${styles.SliderBackColorHide} m-0 p-0`}>
                      <div
                        style={{ backgroundColor: "#ECEBEB" }}
                        className="m-0 p-0"
                      >
                        <div
                          className={`${styles.TimeSliderContainer} container-fluid  `}
                        >
                          <div
                            className={`${styles.TimeSliderContainerClass} row`}
                          >
                            <DateTimeSlider
                              setBookingTime={(e) => {
                                cart[key].start_time = e;
                                setCart([...cart]);
                              }}
                              setExpert={(e) => {
                                cart[key].expertProfile = e;
                                setCart([...cart]);
                              }}
                              cart={cart[key]}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div
                        className={`${styles.ProfileSmallManageContainer} m-0 `}
                      >
                        <div className={styles.ProfileSliderContain}>
                          <div
                            className={`row`}
                            style={{
                              paddingRight: "-0.5%",
                              position: "relative",
                            }}
                          >
                            <ProfileSlider
                              setBookingExpert={(e, charges) => {
                                cart[key].expert_id = e?.user_id?._id;
                                cart[key].expert_Data = e?.user_id;
                                cart[key].charges = charges;
                                setCart([...cart]);
                                booking("profile", charges);
                              }}
                              // setCharges={(e) => {
                              //   cart[key].charges = e;
                              //   setCart([...cart]);
                              // }}
                              cart={cart[key]}
                              userID={values?._id}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
            <br />
          </div>
          <div
            className={` col-xl-4 col-lg-0 col-md-0 col-sm-0  `}
            style={{ backgroundColor: "#F8F7F7", height: "80.rem" }}
          >
            <div className="treatmentDetails">
              <div className={`${style.HeadingRight} ${styles.MarginClass}`}>
                Deine Behandlungen
              </div>
              <div style={{ paddingBottom: "18px" }}>
                <div className={`${styles.Card}  ${styles.CardWidth}`}>
                  <div className={`${styles.DisplayCard}`}>
                    <div className={styles.WidthLeft}>
                      <img
                        src={"/Images/ec1a.png"}
                        className={style.LeftIcon}
                      />
                    </div>
                    <div style={{ width: "82%" }}>
                      <div className={style.FlexDiv}>
                        <div className={styles.CardHeading1}>
                          {address && address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {cart?.map((data, value) => {
                return (
                  <div
                    className={`${styles.ClassicCard} ${styles.CardWidth}`}
                    key={value}
                  >
                    <div className={styles.DisplayCard}>
                      <div className={styles.WidthLeft}>
                        <img
                          src={
                            data?.expert_id?.image
                              ? data?.expert_id?.image
                              : data?.expert_Data?.image
                              ? data?.expert_Data?.image
                              : "/Images/avatarIcon.png"
                          }
                          className={styles.LeftPic}
                        />
                        <div className={styles.ShortName}>
                          {data?.expert_id?.name
                            ? getFirstCharacter(data?.expert_id?.name) || ""
                            : data?.expert_Data?.name
                            ? getFirstCharacter(data?.expert_Data?.name) || ""
                            : null}
                        </div>
                      </div>
                      <div className={styles.WidthRight}>
                        <div className={style.FlexDiv}>
                          <div
                            className={`${styles.CardHeading2} text-capitalize`}
                          >
                            {data?.service_id?.name || data?.name}
                            <p className={styles.Time}>
                              Dauer:{data?.duration} Minuten
                            </p>
                            <p
                              className={styles.Remove}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handlerRemoveCart(data?._id, value);
                              }}
                            >
                              Entfernen
                            </p>
                          </div>
                          <div className={styles.Amount}>
                            €{parseFloat(data?.charges).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className={`${style.DetailCard} ${styles.CardMargin} ${styles.CardWidth}`}
              >
                <div className={style.Totall}>
                  <div className={style.Total}>
                    <div style={{ fontWeight: "600" }}>Gesamt</div>
                    <div>€{parseFloat(totalcharge).toFixed(2)}</div>
                  </div>
                </div>
                <div
                  className={style.CenterButton}
                  style={{ marginTop: "60px" }}
                >
                  <ZouluButton
                    onClick={() => handlebooking("a")}
                    className={styles.SelectedTime}
                    title="Weiter"
                  />
                </div>
                <div
                  className={style.CenterButton}
                  style={{ marginTop: "30px" }}
                >
                  <ZouluButton
                    onClick={() => router.push("/bookNow")}
                    style={{ fontSize: "14px" }}
                    className={styles.bookingButtonReturn}
                    title="Weitere Behandlung Hinzufügen"
                  />
                </div>
              </div>
            </div>
            <div className={`${style.DoneTextDiv} mt-3`}>
              <img src={"/Images/tiksvg.svg"} className={styles.DoneIconDiv} />
              <span>
                {" "}
                Storniere bis zu 24 Stunden vor deinem Termin kostenfrei
              </span>
            </div>
            <div>
              <div className={style.DoneTextDiv}>
                <img
                  src={"/Images/tiksvg.svg"}
                  className={styles.DoneIconDiv}
                />
                <span> Ausschließlich zertifizerte Experten </span>
              </div>
            </div>
            <div>
              <div className={style.DoneTextDiv}>
                <img
                  src={"/Images/tiksvg.svg"}
                  className={styles.DoneIconDiv}
                />
                <span> Einfache und Sichere Bezahlung </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={style.buttonLocationTreatment}
          onClick={handleShowModal}
        >
          <div className={style.treatmentLengthContainer}>
            {cart?.length ? cart?.length : 0}
          </div>
          <IoMdCart className={style.GoLocationIcon} />
        </div>
        <Modal
          // className="bottom-modal"
          show={
            typeof window !== "undefined" &&
            window.innerWidth <= 601 &&
            showModal
          }
          onHide={() => handleCloseModal()}
          centered
        >
          <Modal.Header
            closeButton
            style={{ borderBottomStyle: "none", borderBottom: "none" }}
          ></Modal.Header>
          <Modal.Body>
            <div className={`${style.HeadingRight} ${styles.MarginClass}`}>
              Deine Behandlungen
            </div>
            <div style={{ paddingBottom: "18px" }}>
              <div className={`${styles.Card}  ${styles.CardWidth}`}>
                <div className={`${styles.DisplayCard}`}>
                  <div className={styles.WidthLeft}>
                    <img src={"/Images/ec1a.png"} className={style.LeftIcon} />
                  </div>
                  <div style={{ width: "82%" }}>
                    <div className={style.FlexDiv}>
                      <div className={styles.CardHeading1}>
                        {address && address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {cart?.map((data, value) => {
              return (
                <div
                  className={`${styles.ClassicCard} ${styles.CardWidth}`}
                  key={value}
                >
                  <div className={styles.DisplayCard}>
                    <div className={styles.WidthLeft}>
                      <img
                        src={
                          data?.expert_id?.image
                            ? data?.expert_id?.image
                            : data?.expert_Data?.image
                            ? data?.expert_Data?.image
                            : "/Images/avatarIcon.png"
                        }
                        className={styles.LeftPic}
                      />
                      <div className={styles.ShortName}>
                        {data?.expert_id?.name
                          ? getFirstCharacter(data?.expert_id?.name) || ""
                          : getFirstCharacter(data?.expert_Data?.name) || ""}
                      </div>
                    </div>
                    <div className={styles.WidthRight}>
                      <div className={style.FlexDiv}>
                        <div
                          className={`${styles.CardHeading2} text-capitalize`}
                        >
                          {data?.service_id?.name || data?.name}
                          <p className={styles.Time}>
                            Dauer: {data?.duration} Minuten
                          </p>
                          <p
                            className={styles.Remove}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handlerRemoveCart(data?._id, value);
                            }}
                          >
                            Entfernen
                          </p>
                        </div>
                        <div className={styles.Amount}>
                          €{parseFloat(data?.charges).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className={`${style.DetailCard} ${styles.CardMargin} ${styles.CardWidth}`}
            >
              <div className={style.Totall}>
                <div className={style.Total}>
                  <div style={{ fontWeight: "600" }}>Gesamt</div>
                  <div>€{parseFloat(totalcharge).toFixed(2)}</div>
                </div>
              </div>
              <div className={style.CenterButton} style={{ marginTop: "60px" }}>
                <ZouluButton
                  onClick={() => handlebooking("a")}
                  className={styles.SelectedTime}
                  title="Weiter"
                  style={{
                    fontSize: "5px",
                    fontWeight: "400",
                    marginTop: "3px",
                    marginLeft: "5px",
                  }}
                />
              </div>
              <div className={style.CenterButton} style={{ marginTop: "30px" }}>
                <ZouluButton
                  onClick={() => router.push("/bookNow")}
                  style={{ fontSize: "14px" }}
                  className={styles.bookingButtonReturn}
                  title="Weitere Behandlung Hinzufügen"
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <LoginModal
          show={loginModal}
          setShow={(e) => setLoginModal(e)}
          setSignUpSecond={(e) => setSignUpSecond(e)}
          setValue={(e) => setValue(e)}
          setShowCreateProfile={(e) => setShowCreateProfile(e)}
          setStatus={(e) => setStatus(e)}
        />
        <SignUpSecondModal
          show={signUpSecond}
          setShow={(e) => setSignUpSecond(e)}
          setShowCreateProfile={(e) => setShowCreateProfile(e)}
          setLoginModal={(e) => setLoginModal(e)}
          setValue={(e) => setValue(e)}
        />
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
            values={values}
            phoneNum={phoneNum}
            setStatus={(e) => setStatus(e)}
          />
        )}
        {showThanks && (
          <ThanksModal show={showThanks} setShow={(e) => setShowThanks(e)} />
        )}
        <ContactModal show={showContact} setShow={(e) => setShowContact(e)} />
      </div>
    </>
  );
};
export default TreatmentDetail;
