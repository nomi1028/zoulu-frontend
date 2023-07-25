import React, { useState } from "react";
import { Row, Col, Card } from "reactstrap";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/adminDash.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@mui/material/Grid";
// import ReactApexChart from "react-apexcharts";

import { RiDeleteBinFill } from "react-icons/ri";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const AdminDash = () => {
  // const [showChart, setShowChart] = useState({
  //   series: [
  //     { name: "PRODUCT A", data: [44, 55, 41, 67, 22, 43, 21, 49] },
  //     { name: "PRODUCT B", data: [13, 23, 20, 8, 13, 27, 33, 12] },
  //     { name: "PRODUCT C", data: [11, 17, 15, 15, 21, 14, 15, 13] },
  //   ],
  //   options: {
  //     chart: { type: "bar", height: 350, stacked: true, stackType: "100%" },
  //     responsive: [{ breakpoint: 480, options: { legend: { position: "bottom", offsetX: -10, offsetY: 0 } } }],
  //     xaxis: { categories: ["2011 Q1", "2011 Q2", "2011 Q3", "2011 Q4", "2012 Q1", "2012 Q2", "2012 Q3", "2012 Q4"] },
  //     fill: { opacity: 1 },
  //     legend: { position: "right", offsetX: 0, offsetY: 50 },
  //   },
  // });
  return (
    <SidebarWrapper>
      <div className="container-fluid margin-sidebar ">
        <div className="d-flex justify-content-between">
          <div className={styles.overviewTitle}>Overview</div>
          <div className={styles.thisWeakDrop}>
            <div className={styles.thisWeakText}>This weak</div>
            <img src={"/Images/Polygon.png"} className={styles.WeakDropArrow} />
          </div>
        </div>
        <Row className=" mt-4">
          <Col xs={12} sm={6} md={6} lg={6} xl={3} className=" mt-1 mb-1">
            <Card className={styles.cardIncomePeriod}>
              <div className="d-flex">
                <div className={styles.arrowBox}>
                  <img src={"/Images/arrowUpDown.png"} className={styles.ArrowUpwardIcon} />
                </div>
                <div className={styles.marginLeft}>
                  <div className="d-flex">
                    <div className={styles.amountDollar}>$4300</div>
                    <div className={styles.dollarPercent}>+2.4%</div>
                  </div>
                  <div className={styles.IncomePeriods}>Income in this period</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} xl={3} className=" mt-1 mb-1">
            <Card className={styles.cardIncomePeriod}>
              <div className="d-flex">
                <div className={styles.arrowBoxPink}>
                  <img src={"/Images/arrowUpDown.png"} className={styles.ArrowUpwardIcon} />
                </div>
                <div className={styles.marginLeft}>
                  <div className="d-flex">
                    <div className={styles.amountDollar}>$4300</div>
                    <div className={styles.dollarPercentPink}>+2.4%</div>
                  </div>
                  <div className={styles.IncomePeriods}>Expense in this period</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} xl={3} className=" mt-1 mb-1">
            <Card className={styles.cardIncomePeriod}>
              <div className="d-flex">
                <div className={styles.arrowBoxBlue}>
                  <img src={"/Images/Arrow35.png"} className={styles.ArrowUpwardIcon} />
                </div>
                <div className={styles.marginLeft}>
                  <div className="d-flex">
                    <div className={styles.amountDollar}>$4300</div>
                    <div className={styles.dollarPercentBlue}>+2.4%</div>
                  </div>
                  <div className={styles.IncomePeriods}>Total visitor in this period</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} xl={3} className=" mt-1 mb-1">
            <Card className={styles.cardIncomePeriod}>
              <div className="d-flex">
                <div className={styles.arrowBoxOrange}>
                  <img src={"/Images/arrowUpDown.png"} className={styles.ArrowUpwardIcon} />
                </div>
                <div className={styles.marginLeft}>
                  <div className="d-flex">
                    <div className={styles.amountDollar}>$4300</div>
                    <div className={styles.dollarPercentOrange}>+2.4%</div>
                  </div>
                  <div className={styles.IncomePeriods}>New customers in this period</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} sm={12} md={12} lg={6} className=" mt-1 mb-1">
            <Card className={styles.customersGrowth}>
              <div className={styles.FlexWeekTimeSpace}>
                <div className={styles.TransactionHistoryTitle}>customers growth</div>
                <div>
                  <div className="d-flex mt-1 mb-2">
                    <div className={styles.dotCalender}></div>
                    <div className={styles.dotWomanCal}>women customers</div>
                  </div>
                  <div className="d-flex mt-1 mb-2">
                    <div className={styles.dotCalenderMan}></div>
                    <div className={styles.dotWomanCal}>Man customers</div>
                  </div>
                  <div className="d-flex mt-1 mb-2">
                    <div className={styles.dotCalenderNew}></div>
                    <div className={styles.dotWomanCal}>New customers</div>
                  </div>
                </div>
              </div>
              <div className="d-flex" style={{ marginTop: "-13px" }}>
                <div className={styles.weeklyDropDown}>Weekly</div>
                <img src={"/Images/ArrowVector.png"} className={styles.ArrowVector} />
              </div>
              {/* <Chart options={showChart.data} series={showChart.options} height={260} /> */}
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} className=" mt-1 mb-1">
            <Card className={styles.invitesBook}>
              <div className={styles.invitesBookTitle}>When can invites book?</div>
              <div className={`${styles.flexBetweenBookAdd} mb-2 `}>
                <div className={`${styles.invitesBookAvailability} mt-2 pt-2`}>Set your daily and hourly availability</div>
                <div className={`${styles.AddNewBook} mt-1`}>+ New Book</div>
              </div>
              <div className={styles.overFlowScroll}>
                <div className={`${styles.WeekTimeBox} mt-2 mb-1`}>
                  <div className={styles.FlexWeekTimeSpace}>
                    <div className={styles.weekName}>Monday</div>
                    <div style={{ display: "flex" }}>
                      <div className={styles.TimeBox}>09:12 Am</div>
                      <div className={`${styles.weekName} mt-0`}>To</div>
                      <div className={styles.TimeBox}>09:12 Pm</div>
                      <RiDeleteBinFill className={styles.RiDeleteBinFill} />
                    </div>
                  </div>
                </div>
                <div className={`${styles.WeekTimeBox} mt-2 mb-1`} style={{ background: " #F8F9FA" }}>
                  <div className={styles.FlexWeekTimeSpace}>
                    <div className={styles.weekName}>Tuesday</div>
                    <div className={`${styles.NotAvailable} mt-2`}>Not Available</div>
                  </div>
                </div>
                <div className={`${styles.WeekTimeBox} mt-2 mb-1`}>
                  <div className={styles.FlexWeekTimeSpace}>
                    <div className={styles.weekName}>Wednesday</div>
                    <div style={{ display: "flex" }}>
                      <div className={styles.TimeBox}>09:12 Am</div>
                      <div className={`${styles.weekName} mt-0`}>To</div>
                      <div className={styles.TimeBox}>09:12 Pm</div>
                      <RiDeleteBinFill className={styles.RiDeleteBinFill} />
                    </div>
                  </div>
                </div>
                <div className={`${styles.WeekTimeBox} mt-2 mb-1`}>
                  <div className={styles.FlexWeekTimeSpace}>
                    <div className={styles.weekName}>Thursday</div>
                    <div style={{ display: "flex" }}>
                      <div className={styles.TimeBox}>09:12 Am</div>
                      <div className={`${styles.weekName} mt-0`}>To</div>
                      <div className={styles.TimeBox}>09:12 Pm</div>
                      <RiDeleteBinFill className={styles.RiDeleteBinFill} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Grid container spacing={3} className="mt-0">
          <Grid item xs={12} sm={12} md={12} lg={6} className=" mt-1 mb-1">
            <Card className={styles.TransactionHistoryCard}>
              <div className={styles.FlexWeekTimeSpace}>
                <div className={styles.TransactionHistoryTitle}>transaction history</div>
                <img src={"/Images/ToggleIcon.png"} className={`${styles.ToggleIcon} `} />
              </div>
              <div className={`${styles.overFlowScrollExperts} `}>
                <div className="mt-4 pt-2" style={{ overflow: "scroll" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.tableHeaderLeft}>payment number</TableCell>
                        <TableCell className={styles.tableHeader}>date & time</TableCell>
                        <TableCell className={styles.tableHeader}>amount</TableCell>
                        <TableCell className={styles.tableHeaderRight} align="right">
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableHeaderRoot">
                      <TableRow>
                        <TableCell className={styles.tableBody}>payment from #39056</TableCell>
                        <TableCell className={styles.tableBody}>aug 27, 2022, 11:50 am</TableCell>
                        <TableCell className={styles.tableBody}>$50.00</TableCell>
                        <TableCell className={styles.tableBody} align="right">
                          <div className={`${styles.tableBodyCompleteBox} mt-1`}> Complete</div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={styles.tableBody}>payment from #39056</TableCell>
                        <TableCell className={styles.tableBody}>aug 27, 2022, 11:50 am</TableCell>
                        <TableCell className={styles.tableBody}>$50.00</TableCell>
                        <TableCell className={styles.tableBody} align="right">
                          <div className={`${styles.tableBodyDeclineBox}`}> Declined</div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3.7} className=" mt-1 mb-1">
            <Card className={styles.recentCustomersCard}>
              <div className={styles.FlexWeekTimeSpace}>
                <div className={styles.zouluexpertsTitle}>recent customers</div>
                <img src={"/Images/ToggleIcon.png"} className={`${styles.ToggleIcon} `} />
              </div>
              <div className={`${styles.overFlowScrollExperts} mt-3`}>
                <div className={styles.FlexWeekTimeSpace}>
                  <div className="d-flex mt-2">
                    <img src={"/Images/profile.png"} className={styles.RecentprofilePng} />
                    <div style={{ marginLeft: "15px" }}>
                      <div className={styles.profileName}>maliha khan </div>
                      <div className="d-flex">
                        <div className={styles.StatusId}>ID #12345 </div>
                        <div className={styles.StatusType}>Pending </div>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-2">Graph</div>
                </div>
                <div className={styles.FlexWeekTimeSpace}>
                  <div className="d-flex mt-2">
                    <img src={"/Images/profile.png"} className={styles.RecentprofilePng} />
                    <div style={{ marginLeft: "15px" }}>
                      <div className={styles.profileName}>maliha khan </div>
                      <div className="d-flex">
                        <div className={styles.StatusId}>ID #12345 </div>
                        <div className={styles.StatusPaid}>paid </div>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-2">Graph</div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={2.3} className=" mt-1 mb-1">
            <Card className={styles.zouluexpertsCard}>
              <div className={styles.zouluexpertsTitle}>zoulu experts</div>
              <div className={`${styles.overFlowScrollExperts} mt-3`}>
                <div className="d-flex mt-2">
                  <img src={"/Images/profile.png"} className={styles.profilePng} />
                  <div style={{ marginLeft: "15px" }}>
                    <div className={styles.profileName}>Milan Jack </div>
                    <div className={styles.ExpertType}>Message </div>
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <img src={"/Images/profile.png"} className={styles.profilePng} />
                  <div style={{ marginLeft: "15px" }}>
                    <div className={styles.profileName}>Milan Jack </div>
                    <div className={styles.ExpertType}>Message </div>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </SidebarWrapper>
  );
};

export default AdminDash;
