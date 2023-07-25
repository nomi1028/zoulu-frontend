import React from "react";
import { Row, Col, Card } from "reactstrap";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/adminFinance.module.css";
import FinanceChart from "./finance/FinanceChart";
const AdminFinance = () => {
  return (
    <SidebarWrapper>
      <div className="container-fluid margin-sidebar ">
        <Row className=" mt-4">
          <Col xs={12} sm={12} md={6} lg={6} xl={3} className=" mt-1 mb-1">
            <Card className={styles.cardTotalBalance}>
              <div className={styles.flexBetweenVolitToggle}>
                <img src={"/Images/VolitFinance.png"} className={styles.VolitFinancePng} />
                <img src={"/Images/ToggleIcon.png"} className={styles.ToggleIconPng} />
              </div>
              <div className={styles.TotalBalanceTitle}>Total Balance</div>
              <div className="d-flex mt-1">
                <div className={styles.TotalBalanceAmount}>$632.000</div>
                <div className={styles.TotalBalanceBox}>+1.92%</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={3} className=" mt-1 mb-1">
            <Card className={styles.cardTotalBalance}>
              <div className={styles.flexBetweenVolitToggle}>
                <img src={"/Images/GroupDollarPink.png"} className={styles.VolitFinancePng} />
                <img src={"/Images/ToggleIcon.png"} className={styles.ToggleIconPng} />
              </div>
              <div className={styles.TotalBalanceTitle}>Total Income</div>
              <div className="d-flex mt-1">
                <div className={styles.TotalBalanceAmount}>$632.000</div>
                <div className={styles.TotalBalanceBoxPink}>+1.92%</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={3} className=" mt-1 mb-1">
            <Card className={styles.cardTotalBalance}>
              <div className={styles.flexBetweenVolitToggle}>
                <img src={"/Images/VolitIconGreen.png"} className={styles.VolitFinancePng} />
                <img src={"/Images/ToggleIcon.png"} className={styles.ToggleIconPng} />
              </div>
              <div className={styles.TotalBalanceTitle}>Total Savings</div>
              <div className="d-flex mt-1">
                <div className={styles.TotalBalanceAmount}>$632.000</div>
                <div className={styles.TotalBalanceBoxBlue}>+1.92%</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={3} className=" mt-1 mb-1">
            <Card className={styles.cardTotalBalance}>
              <div className={styles.flexBetweenVolitToggle}>
                <img src={"/Images/GroupDollarOrange.png"} className={styles.VolitFinancePng} />
                <img src={"/Images/ToggleIcon.png"} className={styles.ToggleIconPng} />
              </div>
              <div className={styles.TotalBalanceTitle}>Total Expenses</div>
              <div className="d-flex mt-1">
                <div className={styles.TotalBalanceAmount}>$632.000</div>
                <div className={styles.TotalBalanceBoxPink}>+1.92%</div>
              </div>
            </Card>
          </Col>
        </Row>
        <Card className={`${styles.graphCard} mt-3`}>
          <div className={styles.centerFlexBetween}>
            <div className={styles.AnalyticsTitle}>Analytics</div>
            <div className="d-flex">
              <div className="d-flex mt-2">
                <div className={styles.dotCalender}></div>
                <div className={styles.dotWomanCal}>Income</div>
              </div>
              <div className="d-flex mt-2">
                <div className={styles.dotCalenderMan}></div>
                <div className={styles.dotWomanCal}>Outcome</div>
              </div>
              <div className={styles.TimeBox}>
                <div>2022</div>
                <img src={"/Images/ArrowVector.png"} className={styles.ArrowVector} />
              </div>
            </div>
          </div>
          <div style={{ height: "380px" }}>
            <FinanceChart />
          </div>
        </Card>
      </div>
    </SidebarWrapper>
  );
};
export default AdminFinance;
