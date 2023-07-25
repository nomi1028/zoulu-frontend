import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/finance.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FinanceChart from "./finance/FinanceChart";

import { FormControl } from "@material-ui/core";
import { MenuItem, Select } from "@mui/material";
import MovingIcon from "@mui/icons-material/Moving";
import { Api } from "../../utils/Api";
var jwt = require("jsonwebtoken");
import moment from "moment";
import Pagination from "../../Components/Pagination";
import Loader from "../../Components/Loader";
import AuthProtected from "../../utils/AuthProtected";
const Index = () => {
  const [financeData, setFinanceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingPagination, setBookingPagination] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dropDownValue, setDropDownValue] = useState("week");
  const [chart, setChart] = useState({
    data: {
      labels: [],
      datasets: [
        {
          label: "Revenue",
          data: [3534, 1807, 4832, 3346, 9321, 1224, 6238],
          backgroundColor: "#30D5C8",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x: { stacked: true }, y: { stacked: true, barWidth: 30 } },
    },
  });
  useEffect(() => {
    getBooking();
    getbookingPagination(currentPage);
  }, [currentPage, dropDownValue]);
  const getBooking = async (page) => {
    setLoading(true);
    const response = await Api(
      "get",
      `api/expert/finance/${typeof window !== "undefined" && jwt.decode(localStorage.getItem("zolu-auth-token"))?.data?._id}?page=${page}&limit=10&duration=${dropDownValue}`
    );
    if (response.status === 200) {
      setLoading(false);
      setFinanceData(response?.data?.data);
      if (dropDownValue === "week" || dropDownValue === "lastweek") filterByThisWeek(response.data.data);
      else if (dropDownValue === "month") filterByThisMonth(response.data.data);
      else filterByThisYear(response.data.data);
    } else {
      setLoading(false);
    }
  };
  const getbookingPagination = async (page) => {
    setLoading(true);
    const response = await Api(
      "get",
      `api/expert/booking/${typeof window !== "undefined" ? jwt.decode(window.localStorage.getItem("zolu-auth-token"))?.data?._id : null}?page=${page}&limit=10&type=upcoming`
    );
    if (response.status === 200) {
      setLoading(false);
      setBookingPagination(response.data.data);
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
  const filterByThisWeek = (data) => {
    const weekDaysShort = moment.weekdaysShort();
    const array = [0, 0, 0, 0, 0, 0, 0];
    const bookings = data?.Bookings || [];
    for (const booking of bookings) {
      for (const [index, week] of weekDaysShort.entries()) {
        if (moment(booking?.date).format("ddd") === week) {
          array[index] += booking?.charges;
        }
      }
    }
    setChart({
      ...chart,
      data: {
        ...chart.data,
        labels: weekDaysShort,
        datasets: [{ label: "Revenue", data: array, backgroundColor: "#007FFF" }],
      },
    });
  };
  const filterByThisMonth = (data) => {
    const firstDayOfMonth = moment().startOf("month");
    const lastDayOfMonth = moment().endOf("month");
    const bookings = data?.Bookings || [];
    const allDatesInMonth = Array.from({ length: lastDayOfMonth.diff(firstDayOfMonth, "days") + 1 }, (_, i) => moment(firstDayOfMonth).add(i, "days").format("DD"));
    const array = Array.from({ length: lastDayOfMonth.diff(firstDayOfMonth, "days") + 1 }, () => 0);
    for (const booking of bookings) {
      for (const [index, day] of allDatesInMonth.entries()) {
        if (moment(booking?.date).format("DD") === day) {
          array[index] += booking?.charges;
        }
      }
    }
    setChart({
      ...chart,
      data: {
        ...chart.data,
        labels: allDatesInMonth,
        datasets: [{ label: "Revenue", data: array, backgroundColor: "#007FFF" }],
      },
    });
  };
  const filterByThisYear = (data) => {
    const today = new Date();
    let months = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(today.getFullYear(), i, 1).toLocaleDateString("default", { month: "short" });
      months.push(month);
    }
    const array = Array.from({ length: 12 }, () => 0);
    const bookings = data?.Bookings || [];
    for (const booking of bookings) {
      for (const [index, month] of months.entries()) {
        if (moment(booking?.date).format("MMM") === month) {
          array[index] += booking?.charges;
        }
      }
    }
    setChart({
      ...chart,
      data: {
        ...chart.data,
        labels: months,
        datasets: [{ label: "Revenue", data: array, backgroundColor: "#007FFF" }],
      },
    });
  };
  console.log(dropDownValue);
  return (
    <>
      {loading ? <Loader /> : null}
      <SidebarWrapper>
        <div className="container-fluid margin-sidebar mt-5 pt-4">
          <div className="row mt-5 ">
            <div className="col-lg-12 col-xl-9 pad-small-zero">
              <div className={`${styles.CardContainer} ${styles.GraphFixHeight}`}>
                <div className={`${styles.RevenueDiv} ${styles.DisplaySpace}`}>
                  <div className={styles.RevenueText}>Umsatz</div>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: "120px" }}>
                      <Select
                        style={{
                          borderRadius: "10px",
                          height: "36px",
                          fontSize: "12px",
                          fontFamily: "PlusJakartaSans-Medium",
                          fontWeight: "500",
                        }}
                        value={dropDownValue}
                        defaultValue={dropDownValue}
                        onChange={(e) => setDropDownValue(e.target.value)}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={"week"} selected>
                          Diese Woche
                        </MenuItem>
                        <MenuItem value={"lastweek"}>Letzte Woche</MenuItem>
                        <MenuItem value={"month"}>Dieser Monat</MenuItem>
                        <MenuItem value={"year"}>Dieses Jah</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className={styles.GraphContainer}>
                  <div className={styles.GraphContainerFinance}>
                    <FinanceChart chart={chart} />
                  </div>
                </div>
                <br />
              </div>
            </div>
            <div className="col-xl-3  col-lg-12 pad-small-zero">
              <div className={`${styles.CardContainer} ${styles.IncomCardPadding}`}>
                <div className={styles.IncomeHeading}>Gesamtumsatz</div>
                <div className={styles.IncomeAmount}>€{financeData?.totalRevenue}.00</div>
              </div>
            </div>
            <div className="col-lg-12 mt-4 pad-small-zero">
              <div className={`${styles.CardContainer} ${styles.TablePAd}`}>
                <div className={`${styles.DisplaySpace} mb-3`}>
                  <div className={styles.LatestHeading}>Letzte Transaktionen</div>
                </div>
                <div style={{ overflow: "auto" }}>
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
                        <th scope="col">Datum</th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Zeit
                        </th>
                        <th
                          scope="col"
                          style={{
                            float: "right",
                            border: "1px solid transparent",
                          }}
                        >
                          Betrag
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ overflow: "auto", height: "100px" }}>
                      {financeData?.Bookings?.map((item, i) => (
                        <>
                          <tr className={styles.TableDataBelow} key={i}>
                            <td>
                              <div className={`${styles.TableProfileName} text-capitalize`}>{item?.service_id?.name}</div>
                            </td>
                            <td style={{ fontFamily: "PlusJakartaSans-Medium" }}>{moment(item?.service_id?.created_at).format("ll")}</td>
                            <td
                              style={{
                                textAlign: "center",
                                fontFamily: "PlusJakartaSans-Medium",
                              }}
                            >
                              {moment(item?.service_id?.created_at).format("LT")}
                            </td>
                            <td
                              style={{
                                color: "#F92E01",
                                float: "right",
                                fontFamily: "PlusJakartaSans-Medium",
                              }}
                            >
                              £{item?.charges}.00
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "25px",
                  }}
                >
                  {bookingPagination?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};

export default AuthProtected(Index);
