import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/finance.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FinanceChart from "./finance/FinanceChart";
import MovingIcon from "@mui/icons-material/Moving";
import { Api } from "../../utils/Api";
var jwt = require("jsonwebtoken");
import moment from "moment";
const Index = () => {
  useEffect(() => {
    setLoginRole(localStorage.getItem(`Role`));
  });
  const [loginRole, setLoginRole] = useState();
  const [customerdata, usecustomerdata] = React.useState([1, 2, 3, 4]);
  const [checkValue, setCheckValue] = useState("payPal");
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
    setValue(token?.data?.expert?._id);
  }, [value]);
  useEffect(() => {
    if (value) getbooking();
    //  if (booking) {
    //    totalRevenue();
    //  }
  }, [loading, value]);
  const getbooking = async () => {
    const response = await Api("get", `api/expert/getRevenue?expertId=${value}`);
    if (response.status === 200) {
      setLoading(true);
      setBookings(response?.data?.data?.orderDetails);
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
            end: new Date(data?.start),
            status: "past",
            colorEvento: "#a7d08d",
            color: "#0A0425",
          });
          setConfirmed(pastBookingarray);
        } else if (now < date) {
          pastBookingarray.push({
            title: data?.title,
            start: new Date(data?.start),
            end: new Date(data?.start),
            status: "upcoming",
          });
          setConfirmed(pastBookingarray);
        }
      }
    });
  };
  const statusHandler = (data) => {
    setStatus(data);
  };
  console.log(booking, "booking");
  console.log(confirmed, "confirmed");
  console.log(pending, "pending");
  console.log("state", loginRole);
  return (
    <SidebarWrapper>
      <div className="container-fluid margin-sidebar">
        <div className="row mt-5">
          <div className="col-lg-12 col-xl-9 pad-small-zero">
            <div className={`${styles.CardContainer} ${styles.GraphFixHeight}`}>
              <div className={`${styles.RevenueDiv} ${styles.DisplaySpace}`}>
                <div className={styles.RevenueText}>Revenue</div>
                <MoreHorizIcon className={styles.RevenueIcon} />
              </div>
              <div className={styles.GraphContainer}>
                <div className={styles.WeeklyDropDown}>
                  <div className={` ${styles.GraphDropDown} dropdown`}>
                    <button className={`${styles.GraphDropDownBtn} btn   dropdown-toggle`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Weekly
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.GraphContainerFinance}>
                  <FinanceChart />
                </div>
              </div>
              <br />
            </div>
          </div>
          <div className="col-xl-3  col-lg-12 pad-small-zero">
            <div className={`${styles.CardContainer} ${styles.IncomCardPadding}`}>
              <div className={styles.IncomeHeading}>Total Income</div>
              <div className={styles.IncomeAmount}>
                £{revenue}
                {/* <span style={{ color: "#A1A0BD" }}> .52</span> */}
              </div>
              <div className={styles.IconTextDiv}>
                <MovingIcon />
                <div>+ 11 %</div>
              </div>
            </div>
          </div>
          {/* <div className="row  mt-4 "> */}
          <div className="col-lg-12 mt-4 pad-small-zero">
            <div className={`${styles.CardContainer} ${styles.TablePAd}`}>
              <div className={`${styles.DisplaySpace} mb-3`}>
                <div className={styles.LatestHeading}>Latest Transaction</div>
                <div className={` ${styles.GraphDropDown1} dropdown`}>
                  <button className={`${styles.GraphDropDownBtn} btn   dropdown-toggle`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    All
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{
                  overflow: "auto",
                  height: "75%",
                }}
              >
                <table class="table">
                  <thead
                    style={{
                      position: "sticky",
                      top: "0",
                      zIndex: "1",
                      backgroundColor: "white",
                    }}
                  >
                    <tr
                      className={styles.TableHead}
                      style={{
                        borderBottom: "2px solid transparent",
                      }}
                    >
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Time
                      </th>
                      <th
                        scope="col"
                        style={{
                          float: "right",
                          border: "1px solid transparent",
                        }}
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ overflow: "auto", height: "100px" }}>
                    {booking?.map((data, index) => {
                      return (
                        <>
                          {data?.status === "paid" ? (
                            <tr className={styles.TableDataBelow} key={index}>
                              <th scope="row">
                                <div className={styles.TotalWidth1}>
                                  <img src={"/Images/tablepic.png"} />
                                  <span className={`${styles.TableProfileName} ${styles.PAddinfLeft}`}>{data?.name}</span>
                                </div>
                              </th>
                              <td> {moment(data?.transactionDate).format("ll")}</td>
                              <td style={{ textAlign: "center" }}>{moment(data?.transactionDate).format("LT")}</td>
                              <td style={{ color: "#F92E01", float: "right" }}>£{data?.cartItem?.charges}.00</td>
                            </tr>
                          ) : null}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Index;
