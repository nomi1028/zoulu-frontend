import { StylesContext } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/bookings.module.css";
import style from "../../styles/dashboard.module.css";
import Button from "@mui/material/Button";
import { Api } from "../../utils/Api";
var jwt = require("jsonwebtoken");
import moment from "moment";

const Index = () => {
  const [booking, setBookings] = React.useState();
  const [revenue, setRevenue] = React.useState(0);
  const [loading, setLoading] = React.useState();
  const [confirmed, setConfirmed] = React.useState();
  const [pending, setPending] = React.useState();
  const [status, setStatus] = useState("Confirmed");
  const [value, setValue] = useState();
  const [state, setState] = useState("upcoming");
  useEffect(() => {
    console.log("useEffect is running");
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValue(token.data.expert._id);
  }, [value]);
  useEffect(() => {
    if (value) getbooking();
    if (booking) {
      totalRevenue();
    }
  }, [loading, value]);
  const getbooking = async () => {
    console.log("===>", `api/expert/getRevenue?expertId=${value}`);
    const response = await Api("get", `api/expert/getRevenue?expertId=${value}`);
    if (response.status === 200) {
      setLoading(true);
      console.log(response?.data?.data?.calendarData);
      setBookings(response?.data?.data?.calendarData);
      setRevenue(response?.data?.data?.revenue);
    }
  };
  const totalRevenue = () => {
    var pendingarray = [];
    var pastBookingarray = [];
    booking?.map((data, index) => {
      if (data?.start) {
        var date = moment(data?.start);
        var now = moment();
        if (now > date) {
          pastBookingarray.push({
            title: data?.title,
            start: new Date(data?.start),
            end: new Date(data?.end),
            status: "past",
            duration: data?.duration,
          });
          setConfirmed(pastBookingarray);
        } else if (now < date) {
          pastBookingarray.push({
            title: data?.title,
            start: new Date(data?.start),
            end: new Date(data?.end),
            status: "upcoming",
            duration: data?.duration,
          });
          setConfirmed(pastBookingarray);
        }
      }
    });
  };
  return (
    <SidebarWrapper>
      <div className="container-fluid margin-sidebar ">
        <div className="row pt-3">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pad-small-zero">
            <div className={`${styles.DashboardCard}  ${styles.BookingPadding}`}>
              <div className={styles.BookingHeading}>Bookings</div>
              <div className={`${styles.DisplaySpace}  mt-4`}>
                <div>
                  <Button className={state === "upcoming" ? styles.NewButtonsActive : styles.BtnTransparent} onClick={() => setState("upcoming")}>
                    Upcoming
                  </Button>
                  <Button className={state === "past" ? styles.NewButtonsActive : styles.BtnTransparent} onClick={() => setState("past")}>
                    Past Booking
                  </Button>
                </div>
              </div>
              {confirmed?.map((data, index) => {
                return (
                  <>
                    {data?.status === state ? (
                      <div className={`${styles.DisplaySpace}  ${styles.CommonBgcolor} mt-4`} key={index}>
                        <div className="d-flex">
                          <div className={`${styles.DashboardCard} ${styles.BookingsPadding}`}>
                            <div className={styles.BookingsDay}>{moment(data?.start).format("dddd")}</div>
                            <div className={styles.BookingsDate}>{moment(data?.start).format("DD")}</div>
                            <div className={`${styles.BookingsDay} mt-2`}> {moment(data?.start).format("MMMM ")}</div>
                          </div>
                          <div className={styles.BookingsDetailContainer}>
                            <div className={`${styles.OfferText} ${styles.ClassForLEftPAdding} `}>{data?.title}</div>
                            <div className={`${styles.BookingsDay1} mt-2`}>{data?.duration} min</div>
                            <div className={styles.BookingsDay1}>
                              message {moment(data?.start).format("LT")}- {moment(data?.end).format("LT")}
                            </div>
                          </div>
                        </div>
                        <div>{data?.status === "upcoming" ? <Button className={styles.OnWay}>Auf dem Weg</Button> : null}</div>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};
export default Index;
