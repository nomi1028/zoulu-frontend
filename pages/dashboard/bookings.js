import { StylesContext } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/bookings.module.css";
import style from "../../styles/dashboard.module.css";
import Button from "@mui/material/Button";
import { Api } from "../../utils/Api";
var jwt = require("jsonwebtoken");
import moment from "moment";
import "moment/locale/de";
import Pagination from "../../Components/Pagination";
import Loader from "../../Components/Loader";
import AuthProtected from "../../utils/AuthProtected";
import { Rating } from "@mui/material";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Index = () => {
  const [booking, setBookings] = React.useState();
  const [UserID, setUserID] = React.useState();
  const [confirmed, setConfirmed] = React.useState();
  const [pending, setPending] = React.useState();
  const [status, setStatus] = useState("Confirmed");
  const [values, setValue] = useState("upcoming");
  const [tabValue, setTabValue] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setUserID(token?.data?._id);
    getbooking(token?.data?._id, currentPage);
  }, [currentPage, values]);

  console.log("booking", booking);
  const getbooking = async (id, page) => {
    setLoading(true);

    const response = await Api("get", `api/expert/booking/${id}?type=${values}&page=${page}&limit=10`);
    if (response.status === 200) {
      setLoading(false);
      console.log(response?.data?.data);
      setBookings(response?.data?.data);
      if (pages.length === 0) {
        for (let i = 1; i <= response?.data.pagination?.pages; i++) {
          pages.push(i);
        }
        setPages(pages);
      }
    } else {
      setLoading(false);
    }
  };
  function getEndTime(start_time, min_to_add) {
    const date = new Date(`1970-01-01T${start_time}:00`);
    date.setMinutes(date.getMinutes() + min_to_add);
    const newTimeString = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    return newTimeString;
  }
  function getStartTime(date, start_time) {
    let datee = moment(date).format("YYYY-MM-DD");
    let time = start_time;
    let concaDate = datee + "T" + time;
    let newDate = new Date(concaDate);
    return newDate;
  }
  function completeBooking(start_time, min_to_add, valueDate) {
    const date = new Date(`1970-01-01T${start_time}:00`);
    date.setMinutes(date.getMinutes());
    const newTimeString = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    let datee = moment(valueDate).format("YYYY-MM-DD");
    let time = newTimeString;
    let concaDate = datee + "T" + time;
    let newDate = new Date(concaDate);
    // var now = moment();
    const now = new Date();
    const localTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
    // testing
    const timestamp = localTime.getTime();
    if (timestamp > newDate) {
      return "Als erledigt markieren";
    }
  }
  const statusBooking = async (bookingID, productID) => {
    const response = await Api("put", `api/customer/booking/rating/${bookingID}?product_id=${productID}`);
    if (response.status == 200) {
      toast.success(response?.data?.msg);
      getbooking(UserID, currentPage);
    } else {
      toast.error(response?.data?.msg);
    }
  };
  const cancelBookingHandler = async (bookingID, productID) => {
    console.log(bookingID, productID);
    const response = await Api("put", `api/expert/booking/${UserID}?booking_id=${bookingID}&product_id=${productID}`);
    if (response.status == 200) {
      toast.success(response?.data?.msg);
      getbooking(UserID, currentPage);
    } else {
      toast.error(response?.data?.msg);
    }
  };
  return (
    <>
      {loading ? <Loader /> : null}
      <SidebarWrapper>
        <div className="container-fluid margin-sidebar  mt-5 pt-2">
          <div className="row pt-4">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pad-small-zero mt-3" style={{ backgroundColor: "#ffffff", borderRadius: "10px" }}>
              <div className={`${styles.marginTopBookingTiitle} mt-4`}>
                <div className={`${styles.containerBuchungen}`}>
                  {values === "upcoming" ? (
                    <h4 className="pb-4" style={style}>
                      Anstehende Buchungen
                    </h4>
                  ) : (
                    <h4 className="pb-4" style={style}>
                      letzte Buchungen
                    </h4>
                  )}
                </div>
                <div className={`${styles.TabsBuchungen}`}>
                  <Box className={`${styles.tabZIndexTop}`} sx={{ width: "100%" }}>
                    <Tabs value={values} onChange={(e, values) => setValue(values)} aria-label="lab API tabs example">
                      <Tab label={`Anstehende Buchugen`} className={values === "upcoming" ? "activeLink" : "tab_1_style"} value={"upcoming"} style={{ marginRight: "18px" }} />
                      <Tab label={`letzte Buchungen`} className={values === "past" ? "activeLink" : "tab_1_style"} value={"past"} />
                    </Tabs>
                  </Box>
                </div>

                {booking?.map((value, index) => {
                  console.log(value);
                  return (
                    <>
                      <div className="CardBookingExpert my-3" key={index}>
                        <div className="flex-calenderBox-Btns">
                          <div className="d-flex pt-1">
                            <div className="d-flex pt-1" style={{ width: "270px" }}>
                              <div className="calenderBookingBox mt-1">
                                <div className="weekNameCalender">{moment(value?.product?.date).locale("de").format("dddd").slice(0, 3)}</div>
                                <div className="weekDayCalender ">{moment(value?.product?.date).format("DD")}</div>
                                <div className="monthNameCalender">{moment(value?.product?.date).format("MMM ")}</div>
                              </div>
                              <div className="mt-1">
                                <div className="BookingMassage-NameExpert">{value?.product?.service_id?.name}</div>
                                <div className="BookingMassage-Time pt-1">{value?.product?.duration} min</div>
                                <div className="BookingMassage-Time">
                                  {value?.product?.start_time}-{getEndTime(value?.product?.start_time, value?.product?.duration)} {/* Uhr */}
                                </div>
                              </div>
                            </div>
                            <div style={{ fontSize: "13px" }}>
                              <div className="BookingMassage-NameExpert mt-3" style={{ fontSize: "13px" }}>
                                {value?.bookingID?.user_id?.name}
                              </div>
                              <div className="BookingMassage-Time mt-2">{value?.bookingID?.user_id?.address}</div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            {value?.product?.rating > 0 ? (
                              <>
                                <Stack spacing={0} className="stackRating-bookingReview" style={{ width: "121px" }}>
                                  <Rating value={value?.product?.rating} readOnly precision={0.5} style={{ color: "#ffffff" }} size="small" />
                                </Stack>
                                {/* <Stack className="stackRating-bookingReview" style={{ width: "155px" }}>
                                  <Rating name="read-only" value={value?.product?.rating} readOnly className="mt-2" />
                                </Stack> */}
                              </>
                            ) : (
                              <div>
                                {completeBooking(value?.product?.start_time, value?.product?.duration, value?.product?.date) && value?.product?.status === "pending" ? (
                                  <Button
                                    // title={"pending"}
                                    className={styles.OnWayCompleted}
                                    onClick={() => {
                                      statusBooking(value?.bookingID?._id, value?.product?._id);
                                    }}
                                  >
                                    {completeBooking(value?.product?.start_time, value?.product?.duration, value?.product?.date)}
                                  </Button>
                                ) : (
                                  <>
                                    {value?.product?.status === "completed" ? (
                                      <Button className={styles.OnWay}>{"abgeschlossen"}</Button>
                                    ) : value?.product?.status === "pending" ? (
                                      <Button className={styles.OnWayBLue}>{"Anstehend"}</Button>
                                    ) : (
                                      <Button className={styles.OnWay}>{value?.product?.status}</Button>
                                    )}
                                  </>
                                )}
                                {value?.product?.status === "pending" && !completeBooking(value?.product?.start_time, value?.product?.duration, value?.product?.date) ? (
                                  <Button className={styles.OnWay} onClick={() => cancelBookingHandler(value?.bookingID?._id, value?.product?._id)}>
                                    Stornieren
                                  </Button>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "25px",
                  }}
                >
                  {booking?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};
export default AuthProtected(Index);
