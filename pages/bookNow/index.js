import React, { Fragment, useState } from "react";
import style from "../../styles/booknow.module.css";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import Footer from "../Common/Footer/Footer";
import AddressModal from "./AddressModal";
import DeepTissueMassage from "./DeepTissueMassage";
import ProfileModal from "./ProfileModal";
import { Row, Col } from "reactstrap";
import Grid from "@mui/material/Grid";
import TimeModal from "./TimeModal";
import Contact from "../home/Components/contact/Contact";
import { useEffect } from "react";
import { Api } from "../../utils/Api";
import LoginModal from "../home/Components/Login Modal/LoginModal";
import SignUpSecondModal from "../treatment/SignUpSecond";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Protected from "../../utils/ProtectedRoute";
import Loader from "../../Components/Loader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Pagination from "../../Components/Pagination";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IoMdCart } from "react-icons/io";
var jwt = require("jsonwebtoken");
import { FaCheck } from "react-icons/fa";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const Treatments = (props) => {
  const matches = useMediaQuery("(max-width:576px)");
  const router = useRouter();
  const { statics } = props;
  const [timeModal, setTimeModal] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [manageDisplay, setManageDisplay] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [deepTissueMassage, setDeepTissueMassage] = useState(false);
  const [categories, setCategories] = React.useState([]);
  const [services, setServices] = useState({});
  const [address, setAddress] = useState();
  const [serviceId, setServiceId] = useState();
  const [servId, setServId] = useState();
  const [carts, setCarts] = useState([]);
  const [cartData, setCartData] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [signUpSecond, setSignUpSecond] = useState(false);
  const [value, setValue] = useState();
  const [loader, setLoader] = useState(false);
  const [role, setRole] = useState("customer");
  const [values, setValues] = useState();
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState();
  const [counter, setCounter] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleChange = (panel) => {
    setServices();
    if (panel === expanded) return setExpanded(false);
    else setExpanded(panel);
  };
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    var cartAdress = window.localStorage.getItem("zolu-cartOld-address");
    if (cartAdress !== null) {
      setAddress(cartAdress);
    }
    setValues(token?.data?._id);
    getCart(token?.data?._id);
    getUserData(token?.data?._id);
    props?.setStatic(window.localStorage.getItem("zolu-auth-token"));
  }, [statics]);
  useEffect(() => {
    let cart = JSON.parse(window.localStorage.getItem("zolu-cartOld")) || [];
    setCartData(cart);
    var b = 0;
    cart?.array?.map((data, index) => {
      b = b + data?.charges;
      setCounter(b);
    });
  }, [carts, counter, address]);
  useEffect(() => {
    getCategory(currentPage);
    // expertPakage();
  }, [currentPage, statics]);
  const getCart = async (id) => {
    setLoader(true);
    setCart();
    if (id) {
      const response = await Api("get", `api/customer/cart/${id}`);
      if (response?.status === 200) {
        setLoader(false);
        props?.setcartLength(response?.data?.data?.products?.length);
        setCart(response?.data?.data?.products);
        if (response?.data?.data?.address !== null) {
          setAddress(response?.data?.data?.address);
        }
      } else {
        setLoader(false);
      }
    }
  };
  const getUserData = async (id) => {
    setValue();
    if (id) {
      const response = await Api("get", `api/profile/${id}`);
      if (response?.data?.data?.address !== null) {
        if (!address) {
          setAddress(response?.data?.data?.address);
        }
      }
      setValue(response?.data?.data);
    }
  };
  const getCategory = async (page) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setLoader(true);
    const response = await Api("get", `api/category?page=${page}&limit=10`);
    if (response.status === 200) {
      setCategories(response?.data?.data);
      setServiceList(response?.data?.expertPackage);
      setLoader(false);
      if (pages.length === 0) {
        for (let i = 1; i <= response?.data?.pagination?.pages; i++) {
          pages.push(i);
        }
        setPages(pages);
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };
  // const expertPakage = async () => {
  //   const response = await Api("GET", "api/expertPackage");
  //   if (response.status === 200) {
  //     setServiceList(response?.data.data);
  //   }
  // };
  const bookingCustomer = (e) => {
    setServiceId(e);
    setServId(e?._id);
    if (!address) {
      setManageDisplay(false);
      setLocationModal(true);
    } else {
      setDeepTissueMassage(true);
    }
    setExpanded(false);
  };
  const setUserLogHandler = async () => {
    setLoader(true);
    if (value && value !== "undefined") {
      if (cart !== null && cart?.length > 0) {
        if (value?.address === null) {
          const payloads = new FormData();
          payloads.append(`gender`, value?.gender);
          payloads.append(`address`, address);
          payloads.append(`name`, value?.name);
          payloads.append("addCertificates", false);
          const response = await Api("put", `api/profile/${values}`, payloads);
          if (response.status === 200) {
            getUserData(values);
          } else {
            toast.error("error");
          }
          setLoader(false);
        }
        localStorage.removeItem("zolu-cartOld-address");
        router.push("/treatment/TreatmentDetail");
        setLoader(false);
      } else {
        setLoader(false);
      }
    } else if (cartData !== null && cartData?.array?.length > 0) {
      setLoader(false);
      router.push("/treatment/TreatmentDetail");
    } else {
      setLoader(false);
      toast.error("please select service");
    }
  };
  const editLocation = () => {
    setLocationModal(true);
    setManageDisplay(true);
  };
  const handlerRemoveCart = async (cart_id) => {
    if (!values) {
      const array = cartData?.array?.filter((data, index) => cart_id !== index);
      const address = cartData?.address;
      localStorage.setItem("zolu-cartOld", JSON.stringify({ address, array }));
      setCounter();
    } else {
      setLoader(true);
      const payload = new FormData();
      payload.append("userId", values);
      payload.append("productId", cart_id);
      const response = await Api("put", `api/customer/cart`, payload);
      if (response.status === 200) {
        props?.setcartLength(response?.data?.data?.products?.length);
        setCart(response?.data?.data?.products);
        setLoader(false);
      }
    }
  };
  const subCategroryHandler = (data) => {
    if (services?.id === data.id) {
      setServices();
    } else {
      setServices({ id: data.id, service: data.services });
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 601) {
      setShowModal(false);
    }
  }, [showModal, typeof window !== "undefined" && window.innerWidth]);
  const hanlderPrice = async () => {
    //   const response = await Api("get", `api/expertPackage`, payload);
    //   if (response === 200) {
    //   }
    // return 2;
  };
  const mandatoryPakagePrice = (service) => {
    if (serviceList?.length > 0) {
      var mandatoryPakagePrice = 0;
      var price = -1;
      var pkgPrice = 0;
      for (const pkgData of serviceList) {
        for (const packages of pkgData.services.packages) {
          if (
            packages?.package_id?.service_id?.toString() ==
            service._id?.toString()
          ) {
            var pkgoption = service?.options?.find((e) => {
              if (
                packages?.package_id?.option_id.toString() ===
                  e?._id.toString() &&
                e?.mandatory == true
              ) {
                return e;
              }
            });
            if (pkgoption) {
              if (packages?.price < pkgPrice || price == -1) {
                pkgPrice = packages?.price;
                price = packages?.price;
                service.price_per_minute = pkgPrice;
                mandatoryPakagePrice = pkgPrice;
              }
            }
          }
        }
      }
    }
    return mandatoryPakagePrice;
  };
  const handlerlength = (servicLength) => {
    var counter = 0;
    servicLength?.map((data) => {
      if (!data?.deleted) {
        counter++;
      }
    });
    return counter;
  };
  return (
    <Fragment>
      {loader ? <Loader /> : null}
      <Protected role={role}>
        <div className={`container-fluid`}>
          <Row className="mt-4">
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={8}
              xl={8}
              className="treatment-accordian"
              id="catgoryIDs"
            >
              {categories?.map((data, index) => (
                <Accordion
                  className={style.treatmentContainerMargin}
                  expanded={expanded === index}
                  onChange={() => handleChange(index)}
                >
                  {console.log("----", categories)}
                  <AccordionSummary
                    expanded={expanded === index}
                    expandIcon={<ExpandMoreIcon className="messageclassIcon" />}
                    aria-controls={"panel1a-content" + index}
                    id={"panel1a-header" + index}
                  >
                    <img src={data?.image} className="messageclassImage" />
                    <Typography
                      variant="h4"
                      className="text-capitalize messageclassName mt-4 pt-4 "
                    >
                      {data?.name}
                    </Typography>
                    <Typography variant="p" className="messageclass">
                      {handlerlength(data?.services) &&
                        handlerlength(data?.services)}
                      <span style={{ marginLeft: "4px" }}>Behandlungen</span>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="AccordionDetailsText mb-3">
                    {matches ? (
                      <div style={{ width: "100%", overflow: "scroll" }}>
                        <Grid
                          container
                          className="d-flex flex-nowrap  mt-4 subcategory-container"
                        >
                          {data?.sub_category
                            ? data?.sub_categories?.map(
                                (subCategory, index) => (
                                  <Grid
                                    item
                                    className={
                                      services?.id === subCategory?._id
                                        ? "subcategoryTags active mx-1 my-2"
                                        : "subcategoryTags mx-1 my-2"
                                    }
                                    key={index}
                                    onClick={() =>
                                      subCategroryHandler(subCategory)
                                    }
                                  >
                                    {subCategory?.name}
                                  </Grid>
                                )
                              )
                            : null}
                        </Grid>
                      </div>
                    ) : (
                      <Grid container spacing={1} className="mt-4">
                        {data?.sub_category
                          ? data?.sub_categories?.map((subCategory) => (
                              <Grid item xs={12} sm={6} md={6} lg={4}>
                                <div
                                  className="subCategory"
                                  style={{ width: "100%" }}
                                >
                                  <img
                                    src={subCategory?.image}
                                    className="accordian-subCaterogry"
                                    onClick={() => {
                                      subCategroryHandler(subCategory);
                                    }}
                                  />
                                  <div className="subCategoryText">
                                    {subCategory?.name}
                                  </div>
                                  {services?.id === subCategory?._id ? (
                                    <div
                                      className="subCategoryIcon mt-1"
                                      onClick={() =>
                                        subCategroryHandler(subCategory)
                                      }
                                    >
                                      <div
                                        style={{
                                          height: "32px",
                                          width: "32px",
                                          borderRadius: "50%",
                                          background: "#FFFFFF",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <FaCheck style={{ color: "#007FFF" }} />
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </Grid>
                            ))
                          : null}
                      </Grid>
                    )}
                    {
                      <div className="row mt-4 pl-3 pr-3">
                        {expanded === index && data?.sub_category === true ? (
                          <>
                            {services?.service?.map((serviceData, ket) => {
                              if (!serviceData?.deleted) {
                                return (
                                  <div className="col-lg-6 mb-4 " key={ket}>
                                    <div
                                      className={` ${style.CommonHidenCard}`}
                                    >
                                      <div className={style.ShowHeading}>
                                        {serviceData?.name}
                                      </div>
                                      <div className={style.PText}>
                                        {serviceData?.short_description?.slice(
                                          0,
                                          180
                                        ) || "No Description"}
                                      </div>
                                      <div className={style.DisplayCardBottom}>
                                        {console.log(
                                          serviceData?.service_experts[0]
                                            ?.services?.price,
                                          serviceData?.price_per_minute,
                                          "service_experts"
                                        )}
                                        {serviceData?.service_experts[0]
                                          ?.services?.price ||
                                        mandatoryPakagePrice(serviceData) !==
                                          0 ? (
                                          <div>
                                            <div className={style.FromText}>
                                              Ab
                                            </div>
                                            <div className={style.ShowAmount}>
                                              €
                                              {serviceData?.price_per_minute !==
                                              0
                                                ? serviceData?.price_per_minute
                                                : serviceData
                                                    ?.service_experts[0]
                                                    ?.services?.price}
                                            </div>
                                          </div>
                                        ) : (
                                          <p
                                            style={{
                                              fontWeight: "500",
                                              fontSize: "14px",
                                              fontFamily:
                                                "PlusJakartaSans-Medium",
                                              marginTop: "15px",
                                            }}
                                          >
                                            Kein Experte verfügbar
                                          </p>
                                        )}
                                        <ZouluButton
                                          title="Mehr Infos"
                                          disabled={
                                            serviceData?.service_experts[0]
                                              ?.services?.price ||
                                            serviceData?.price_per_minute !== 0
                                              ? false
                                              : true
                                          }
                                          className={`${style.ShowBtn} `}
                                          onClick={() =>
                                            serviceData &&
                                            bookingCustomer(serviceData)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </>
                        ) : null}
                      </div>
                    }
                    <div className="row mt-4 pl-3 pr-3">
                      {expanded === index && data?.sub_category === false ? (
                        <>
                          {data?.services?.map((serviceData, ket) => {
                            if (!serviceData?.deleted) {
                              return (
                                <div className="col-lg-6 mb-4 " key={ket}>
                                  <div className={` ${style.CommonHidenCard}`}>
                                    <div className={style.ShowHeading}>
                                      {serviceData?.name}
                                    </div>
                                    <div className={style.PText}>
                                      {serviceData?.short_description?.slice(
                                        0,
                                        180
                                      ) || "No Description"}
                                    </div>
                                    <div className={style.DisplayCardBottom}>
                                      {serviceData?.service_experts[0]?.services
                                        ?.price ||
                                      mandatoryPakagePrice(serviceData) !==
                                        0 ? (
                                        <div>
                                          <div className="smallScreenStyle">
                                            <div
                                              className={`${style.FromText} marginTop`}
                                            >
                                              Ab
                                            </div>
                                            <div className={style.ShowAmount}>
                                              €
                                              {serviceData?.price_per_minute !==
                                              0
                                                ? serviceData?.price_per_minute
                                                : serviceData
                                                    ?.service_experts[0]
                                                    ?.services?.price}
                                            </div>
                                          </div>
                                          <div className="largeScreenStyle">
                                            <div className={style.FromText}>
                                              Ab
                                            </div>
                                            <div className={style.ShowAmount}>
                                              €
                                              {serviceData?.price_per_minute !==
                                              0
                                                ? serviceData?.price_per_minute
                                                : serviceData
                                                    ?.service_experts[0]
                                                    ?.services?.price}
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <p
                                          style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            fontFamily:
                                              "PlusJakartaSans-Medium",
                                            marginTop: "15px",
                                          }}
                                        >
                                          Kein Experte verfügbar
                                        </p>
                                      )}
                                      <ZouluButton
                                        title="Mehr Infos"
                                        disabled={
                                          serviceData?.service_experts[0]
                                            ?.services?.price ||
                                          serviceData?.price_per_minute !== 0
                                            ? false
                                            : true
                                        }
                                        className={`${style.ShowBtn} `}
                                        onClick={() =>
                                          serviceData &&
                                          bookingCustomer(serviceData)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </>
                      ) : null}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
              <div style={{ display: "flex", justifyContent: "center" }}>
                {categories?.length === 10 ? (
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={(page) => setCurrentPage(page)}
                    pages={pages}
                  />
                ) : null}
              </div>
            </Col>
            <Col sm={12} md={12} lg={4} xl={4}>
              <div className="sideComponent marginPaddingCard">
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  className={style.BookingCompoent}
                >
                  Deine Behandlungen
                </div>
                <div
                  className="mt-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    width: "96%",
                    margin: "auto",
                    padding: "5px",
                  }}
                >
                  <div className={style.BookingCompoentrow}>
                    <div>
                      <img src="/Images/locationicon.png"></img>
                    </div>
                    <div
                      className={style.bookingIconText}
                      style={{ paddingTop: "7px" }}
                    >
                      <div className={style.bookingAdress}>{address}</div>
                    </div>
                  </div>
                  <div className=" ">
                    <div
                      className={style.bookingEditText}
                      style={{ cursor: "pointer" }}
                      onClick={() => editLocation()}
                    >
                      Bearbeiten
                    </div>
                  </div>
                </div>
                <div
                  className={style.BookingTreatment}
                  style={{ width: "96%", margin: "auto", marginTop: "12px" }}
                >
                  Behandlung
                </div>
                {!value ? (
                  <>
                    {cartData?.array?.map((data, index) => (
                      <div
                        className="mt-2"
                        style={{
                          border: "1px solid #F0F0F0",
                          width: "96%",
                          margin: "auto",
                          borderRadius: "8px",
                        }}
                        key={index}
                      >
                        <div
                          className=""
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderRadius: "8px",
                            backgroundColor: "white",
                            width: "100%",
                            margin: "auto",
                            padding: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "2px 7px 0 7px",
                            }}
                          >
                            <div className={style.bookingText}>
                              {data?.name}
                            </div>
                            <div className={style.bookingEditText}>
                              € {data?.charges}
                              .00
                            </div>
                          </div>
                          <div className={style.BookingCompoentrow}>
                            <div className={style.bookingIconText}>
                              {data?.packages?.map((pkg, i) => (
                                <div className={style.packageText} key={i}>
                                  {pkg?.package_id?.title}
                                </div>
                              ))}
                              <div className={style.bookingAdress}>
                                {" "}
                                Dauer:{data?.duration} Minuten
                              </div>
                              <div
                                className={"remove"}
                                onClick={() => handlerRemoveCart(index)}
                              >
                                Entfernen
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {cart?.map((data, index) => {
                      return (
                        <div
                          className="mt-2"
                          style={{
                            border: "1px solid #F0F0F0",
                            width: "96%",
                            margin: "auto",
                            borderRadius: "8px",
                          }}
                          key={index}
                        >
                          <div
                            className=""
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              borderRadius: "8px",
                              backgroundColor: "white",
                              width: "100%",
                              margin: "auto",
                              padding: "5px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "2px 7px 0 7px",
                              }}
                            >
                              <div className={style.bookingText}>
                                {data?.service_id?.name}
                              </div>
                              <div className={style.bookingEditText}>
                                € {data?.charges}
                                .00
                              </div>
                            </div>
                            <div className={style.BookingCompoentrow}>
                              <div className={style.bookingIconText}>
                                {data?.packages?.map((pkg, i) => (
                                  <div className={style.packageText} key={i}>
                                    {pkg?.package_id?.title}
                                  </div>
                                ))}
                                <div className={`${style.bookingAdress}`}>
                                  Dauer:{data?.duration} Minuten
                                </div>
                                <div
                                  className={"remove"}
                                  onClick={() => handlerRemoveCart(data?._id)}
                                >
                                  Entfernen
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                <div
                  className="mt-3"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "99%",
                    margin: "auto",
                    padding: "10px",
                  }}
                >
                  <div>
                    <ZouluButton
                      title="Zeit Wählen"
                      className={`${style.bookingButton} `}
                      onClick={() => setUserLogHandler()}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div
            className={style.buttonLocationTreatment}
            onClick={handleShowModal}
          >
            <div className={style.treatmentLengthContainer}>
              {cartData?.array?.length > 0
                ? cartData?.array?.length
                : cart?.length > 0
                ? cart?.length
                : 0}
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
              <div className="sideComponent marginTreatmentCard">
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  className={style.BookingCompoent}
                >
                  Deine Behandlungen
                </div>
                <div
                  className="mt-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    width: "96%",
                    margin: "auto",
                    padding: "5px",
                  }}
                >
                  <div className={style.BookingCompoentrow}>
                    <div>
                      <img src="/Images/locationicon.png"></img>
                    </div>
                    <div
                      className={style.bookingIconText}
                      style={{ paddingTop: "7px" }}
                    >
                      <div className={style.bookingAdress}>{address}</div>
                    </div>
                  </div>
                  <div className=" ">
                    <div
                      className={style.bookingEditText}
                      style={{ cursor: "pointer" }}
                      onClick={() => editLocation()}
                    >
                      Bearbeiten
                    </div>
                  </div>
                </div>
                <div
                  className={style.BookingTreatment}
                  style={{ width: "96%", margin: "auto", marginTop: "12px" }}
                >
                  Behandlung
                </div>
                {!value ? (
                  <>
                    {cartData?.array?.map((data, index) => (
                      <div
                        className="mt-2"
                        style={{
                          border: "1px solid #F0F0F0",
                          width: "96%",
                          margin: "auto",
                          borderRadius: "8px",
                        }}
                        key={index}
                      >
                        <div
                          className=""
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderRadius: "8px",
                            backgroundColor: "white",
                            width: "100%",
                            margin: "auto",
                            padding: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "2px 7px 0 7px",
                            }}
                          >
                            <div className={style.bookingText}>
                              {data?.name}
                            </div>
                            <div className={style.bookingEditText}>
                              € {data?.charges}
                              .00
                            </div>
                          </div>
                          <div className={style.BookingCompoentrow}>
                            <div className={style.bookingIconText}>
                              {data?.packages?.map((pkg, i) => (
                                <div className={style.packageText} key={i}>
                                  {pkg?.package_id?.title}
                                </div>
                              ))}
                              <div className={style.bookingAdress}>
                                Dauer:{data?.duration} Minuten
                              </div>
                              <div
                                className={"remove"}
                                onClick={() => handlerRemoveCart(index)}
                              >
                                Entfernen
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {cart?.map((data, index) => {
                      return (
                        <div
                          className="mt-2"
                          style={{
                            border: "1px solid #F0F0F0",
                            width: "96%",
                            margin: "auto",
                            borderRadius: "8px",
                          }}
                          key={index}
                        >
                          <div
                            className=""
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              borderRadius: "8px",
                              backgroundColor: "white",
                              width: "100%",
                              margin: "auto",
                              padding: "5px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "2px 7px 0 7px",
                              }}
                            >
                              <div className={style.bookingText}>
                                {data?.service_id?.name}
                              </div>
                              <div className={style.bookingEditText}>
                                € {data?.charges}
                                .00
                              </div>
                            </div>
                            <div className={style.BookingCompoentrow}>
                              <div className={style.bookingIconText}>
                                {data?.packages?.map((pkg, i) => (
                                  <div className={style.packageText} key={i}>
                                    {pkg?.package_id?.title}
                                  </div>
                                ))}
                                <div className={`${style.bookingAdress}`}>
                                  Dauer:{data?.duration} Minuten
                                </div>
                                <div
                                  className={"remove"}
                                  onClick={() => handlerRemoveCart(data?._id)}
                                >
                                  Entfernen
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                <div
                  className="mt-3"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "99%",
                    margin: "auto",
                    padding: "10px",
                  }}
                >
                  <div>
                    <ZouluButton
                      title="Zeit Wählen"
                      className={`${style.bookingButton} `}
                      onClick={() => setUserLogHandler()}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <LoginModal
            show={loginModal}
            setShow={(e) => setLoginModal(e)}
            setRecovery={(e) => setRecovery(e)}
            setSignUpSecond={(e) => setSignUpSecond(e)}
            setValue={(e) => setValue(e)}
            value={value}
            setStatus={(e) => setStatus(e)}
          />
          <SignUpSecondModal
            show={signUpSecond}
            setShow={(e) => setSignUpSecond(e)}
            setLoginModal={(e) => setLoginModal(e)}
            setValue={(e) => setValue(e)}
          />
          <AddressModal
            show={locationModal}
            setShow={(e) => setLocationModal(e)}
            setDeepTissueMassage={(e) => setDeepTissueMassage(e)}
            setAddress={(e) => setAddress(e)}
            address={address}
            manageDisplay={manageDisplay}
            userID={values}
            cart={cart}
            cartData={cartData}
            setCartData={(e) => setCartData(e)}
          />
          <DeepTissueMassage
            show={deepTissueMassage}
            setShow={(e) => setDeepTissueMassage(e)}
            setTimeModal={(e) => setTimeModal(e)}
            serviceId={serviceId}
            values={values}
            address={address}
            setCarts={(e) => setCarts(e)}
            carts={cart}
            setStatic={(e) => props?.setStatic(e)}
            setcartLength={(e) => props?.setcartLength(e)}
            setCart={(e) => setCart(e)}
            showModal={(e) => setShowModal(e)}
          />
          {timeModal && (
            <TimeModal
              show={timeModal}
              setShow={(e) => setTimeModal(e)}
              address={address}
              serviceId={serviceId}
              values={values}
              setStatus={(e) => setStatus(e)}
              servId={servId}
              setCarts={(e) => setCarts(e)}
              carts={cart}
              setStatic={(e) => props?.setStatic(e)}
              setcartLength={(e) => props?.setcartLength(e)}
              setCart={(e) => setCart(e)}
              showModal={(e) => setShowModal(e)}
            />
          )}
          {viewProfile && (
            <ProfileModal
              show={viewProfile}
              setShow={(e) => setViewProfile(e)}
            />
          )}
        </div>
        {/* <Contact /> */}
        {/* <Footer categories={props?.categories} /> */}
      </Protected>
    </Fragment>
  );
};
export default Treatments;
