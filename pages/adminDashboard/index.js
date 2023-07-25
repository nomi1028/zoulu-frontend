import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "reactstrap";
import styles from "../../styles/adminDash.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@mui/material/Grid";
import SideBarWrapper from "./SideBarWrapper";
import AuthProtected from "../../utils/AuthProtected";
import BarChart from "./Components/BarChart";
import { Api } from "../../utils/Api";
import Loader from "../../Components/Loader";
import { FormControl } from "@material-ui/core";
import { MenuItem, Select } from "@mui/material";
import moment from "moment";
import Pagination from "../../Components/Pagination";
const Index = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("week");
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [data, setData] = useState(null);
  const [chart, setChart] = useState({
    data: {
      labels: [],
      datasets: [
        { label: "Women", data: [3534, 1807, 4832, 3346, 9321, 1224, 6238], backgroundColor: "#30D5C8" },
        { label: "Men", data: [3335, 1237, 812, 463, 913, 1332, 6328], backgroundColor: "#F79548" },
        { label: "Customer", data: [1324, 2173, 3433, 4649, 3941, 1142, 3233], backgroundColor: "rgba(80, 65, 188, 0.3)" },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, barWidth: 30 } }, borderRadius: 30 },
  });
  const getData = async () => {
    setLoading(true);
    const response = await Api("get", `api/admin/dashboard?duration=${value}`);
    if (response.status === 200) {
      setData(response.data.data);
      if (value === "week" || value === "lastweek") filterByThisWeek(response.data.data);
      else if (value === "month") filterByThisMonth(response.data.data);
      else filterByThisYear(response.data.data);
      setLoading(false);
    }
  };
  const filterByThisWeek = (data) => {
    const weekDaysShort = moment.weekdaysShort();
    const genderCounts = { male: [0, 0, 0, 0, 0, 0, 0], female: [0, 0, 0, 0, 0, 0, 0], notSpecified: [0, 0, 0, 0, 0, 0, 0] };
    const customers = data?.customers || [];
    for (const obj of customers) {
      const gender = obj?.gender || "notSpecified";
      for (const [index, week] of weekDaysShort.entries()) {
        if (moment(obj?.created_at).format("ddd") === week) {
          genderCounts[gender][index] += 1;
        }
      }
    }
    setChart({
      ...chart,
      data: {
        ...chart.data,
        labels: weekDaysShort,
        datasets: [
          { label: "Women", data: genderCounts.female, backgroundColor: "#30D5C8" },
          { label: "Men", data: genderCounts.male, backgroundColor: "#F79548" },
          { label: "Customer", data: genderCounts.notSpecified, backgroundColor: "rgba(80, 65, 188, 0.3)" },
        ],
      },
    });
  };
  const filterByThisMonth = (data) => {
    const firstDayOfMonth = moment().startOf("month");
    const lastDayOfMonth = moment().endOf("month");
    const allDatesInMonth = Array.from({ length: lastDayOfMonth.diff(firstDayOfMonth, "days") + 1 }, (_, i) => moment(firstDayOfMonth).add(i, "days").format("DD"));
    const genderCounts = {
      male: Array.from({ length: lastDayOfMonth.diff(firstDayOfMonth, "days") + 1 }, () => 0),
      female: Array.from({ length: lastDayOfMonth.diff(firstDayOfMonth, "days") + 1 }, () => 0),
      notSpecified: Array.from({ length: lastDayOfMonth.diff(firstDayOfMonth, "days") + 1 }, () => 0),
    };
    const customers = data?.customers || [];
    for (const obj of customers) {
      const gender = obj?.gender || "notSpecified";
      for (const [index, day] of allDatesInMonth.entries()) {
        if (moment(obj?.created_at).format("DD") === day) {
          genderCounts[gender][index] += 1;
        }
      }
    }
    setChart({
      ...chart,
      data: {
        ...chart.data,
        labels: allDatesInMonth,
        datasets: [
          { label: "Women", data: genderCounts.female, backgroundColor: "#30D5C8" },
          { label: "Men", data: genderCounts.male, backgroundColor: "#F79548" },
          { label: "Customer", data: genderCounts.notSpecified, backgroundColor: "rgba(80, 65, 188, 0.3)" },
        ],
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
    const genderCounts = { male: Array.from({ length: 12 }, () => 0), female: Array.from({ length: 12 }, () => 0), notSpecified: Array.from({ length: 12 }, () => 0) };
    const customers = data?.customers || [];
    for (const obj of customers) {
      const gender = obj?.gender || "notSpecified";
      for (const [index, month] of months.entries()) {
        if (moment(obj?.created_at).format("MMM") === month) {
          genderCounts[gender][index] += 1;
        }
      }
    }
    setChart({
      ...chart,
      data: {
        ...chart.data,
        labels: months,
        datasets: [
          { label: "Women", data: genderCounts.female, backgroundColor: "#30D5C8" },
          { label: "Men", data: genderCounts.male, backgroundColor: "#F79548" },
          { label: "Customer", data: genderCounts.notSpecified, backgroundColor: "rgba(80, 65, 188, 0.3)" },
        ],
      },
    });
  };
  useEffect(() => {
    getData();
  }, [value]);
  const getAllBookings = async (page) => {
    setLoading(true);
    const response = await Api("get", `api/admin/booking?limit=20&page=${page}`);
    if (response.status === 200) {
      if (pages.length === 0) {
        for (let i = 1; i <= response.data.pagination.pages; i++) {
          pages.push(i);
        }
        setPages(pages);
      }
      setBookings(response.data.data);
      setLoading(false);
    } else toast.error(response.data.msg);
  };
  useEffect(() => {
    getAllBookings(currentPage);
  }, [currentPage]);
  return (
    <SideBarWrapper>
      {loading ? <Loader /> : null}
      <div className="containerFluidAdmin mt-5 pt-5">
        <div className="d-flex justify-content-between">
          <div className={`${styles.overviewTitle} pt-3`}>Overview</div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                style={{ borderRadius: "10px", height: "44px", fontSize: "14px", fontFamily: "PlusJakartaSans-Medium", fontWeight: "500" }}
                value={value}
                defaultValue={value}
                onChange={(e) => setValue(e.target.value)}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"week"} selected>
                  This Week
                </MenuItem>
                <MenuItem value={"lastweek"}>Last Week</MenuItem>
                <MenuItem value={"month"}>This Month</MenuItem>
                <MenuItem value={"year"}>This year</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Row className=" mt-4">
          <Col xs={12} sm={6} md={6} lg={4} xl={4} className=" mt-1 mb-1">
            <Card className={styles.cardIncomePeriod}>
              <div className="d-flex">
                <div className={styles.arrowBox}>
                  <img src={"/Images/arrowUpDown.png"} className={styles.ArrowUpwardIcon} />
                </div>
                <div className={styles.marginLeft}>
                  <div className="d-flex">
                    <div className={styles.amountDollar}>£{Math.round(data?.totalBookingRevenue || 0)}</div>
                  </div>
                  <div className={styles.IncomePeriods}>Total Bookings Revenue</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4} xl={4} className=" mt-1 mb-1">
            <Card className={styles.cardIncomePeriod}>
              <div className="d-flex">
                <div className={styles.arrowBox}>
                  <img src={"/Images/arrowUpDown.png"} className={styles.ArrowUpwardIcon} />
                </div>
                <div className={styles.marginLeft}>
                  <div className="d-flex">
                    <div className={styles.amountDollar}>£{Math.round(data?.totalRevenue || 0)}</div>
                  </div>
                  <div className={styles.IncomePeriods}>Income in this period</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4} xl={4} className=" mt-1 mb-1">
            <Card className={styles.cardIncomePeriod}>
              <div className="d-flex">
                <div className={styles.arrowBoxOrange}>
                  <img src={"/Images/arrowUpDown.png"} className={styles.ArrowUpwardIcon} />
                </div>
                <div className={styles.marginLeft}>
                  <div className="d-flex">
                    <div className={styles.amountDollar}>{data?.numberOfCustomers <= 9 && data?.numberOfCustomers > 0 ? "0" + data?.numberOfCustomers : data?.numberOfCustomers}</div>
                  </div>
                  <div className={styles.IncomePeriods}>New customers in this period</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Grid container spacing={3} className="mt-0">
          <Grid item xs={12} sm={12} md={12} lg={6} className=" mt-1 mb-1">
            <Card className={styles.customersGrowth}>
              <div className={styles.FlexWeekTimeSpace}>
                <div className={styles.TransactionHistoryTitle}>customers growth</div>
              </div>
              <div className={`${styles.BarChartHeight}`}>
                <BarChart chart={chart} />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3.5} className=" mt-1 mb-1">
            <Card className={styles.recentCustomersCard}>
              <div className={styles.FlexWeekTimeSpace}>
                <div className={styles.zouluexpertsTitle}>recent customers</div>
              </div>
              <div className={`${styles.overFlowScrollExperts} mt-3`}>
                {data?.recentCustomers?.map((e, index) => (
                  <div className={styles.FlexWeekTimeSpace} key={index}>
                    <div className="d-flex mt-2">
                      <img src={e?.image ? e?.image : "/Images/avatarIcon.png"} className={styles.RecentprofilePng} />
                      <div style={{ marginLeft: "15px" }}>
                        <div className={styles.profileName}>{e?.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={2.5} className=" mt-1 mb-1">
            <Card className={styles.zouluexpertsCard}>
              <div className={styles.zouluexpertsTitle}>zoulu experts</div>
              <div className={`${styles.overFlowScrollExperts} mt-3`}>
                {data?.expert?.map((e, index) => (
                  <div className="d-flex mt-2" key={index}>
                    <img src={e?.image ? e?.image : "/Images/avatarIcon.png"} className={styles.profilePng} />
                    <div style={{ marginLeft: "15px" }}>
                      <div className={styles.profileName}>{e?.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="mt-0">
          <Grid item xs={12} sm={12} md={12} lg={12} className=" mt-1 mb-1">
            <Card className={styles.TransactionHistoryCard}>
              <div className={styles.FlexWeekTimeSpace}>
                <div className={styles.TransactionHistoryTitle}>transaction history</div>
              </div>
              <div className={`${styles.overFlowScrollExperts} `}>
                <div className="mt-4 pt-2" style={{ overflow: "scroll" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.tableHeaderLeft}>Service Name</TableCell>
                        <TableCell className={styles.tableHeader}>Address</TableCell>
                        <TableCell className={styles.tableHeader}>date & time</TableCell>
                        <TableCell className={styles.tableHeader}>Charges</TableCell>
                        <TableCell className={styles.tableHeaderRight} align="right">
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableHeaderRoot">
                      {bookings?.map((row, index) =>
                        row?.products?.map((product, i) => (
                          <TableRow key={i}>
                            <TableCell className={styles.tableBody}>{product?.service_id?.name}</TableCell>
                            <TableCell className={styles.tableBody}>{row?.address ? row?.address?.slice(0, 40) : "N/A"}</TableCell>
                            <TableCell className={styles.tableBody}>{moment(row?.created_at).format("lll")}</TableCell>
                            <TableCell className={styles.tableBody}>€ {product?.charges?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                            <TableCell className={styles.tableBody} align="right">
                              <div style={product?.status === "pending" || product?.status === "completed" ? PendingBtn : product?.status === "confirmed" ? ApprovedBtn : CancelBtn}>
                                {product?.status}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              {bookings?.length > 0 ? <Pagination currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} pages={pages} /> : null}
            </Card>
          </Grid>
        </Grid>
      </div>
    </SideBarWrapper>
  );
};
export default AuthProtected(Index);
export const ApprovedBtn = {
  color: "rgb(48, 213, 200)",
  background: "rgba(48, 213, 200,0.2)",
  padding: "8px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
  float: "right",
};
export const PendingBtn = {
  color: "rgb(66,124,255)",
  background: "rgba(66,124,255,0.2)",
  padding: "8px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
  float: "right",
};
export const CancelBtn = {
  color: "rgb(246, 0, 21)",
  background: "rgba(246, 0, 21,0.2)",
  padding: "8px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
  float: "right",
};
