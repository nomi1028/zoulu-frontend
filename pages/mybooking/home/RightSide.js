import React from "react";
import styles from "../../../styles/dashboard.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import CircularProgress from "@mui/material/CircularProgress";
const RightSide = () => {
  return (
    <div className={` ${styles.MArginTopSmall} container-fluid m-0 p-0 `} style={{ marginTop: "15px" }}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="audience_satiscations_chart">
            <div className={`${styles.DashboardCard} ${styles.DonutCardPadding}`}>
              <div className={styles.DonutCardHeading}> Audience Satisfations </div>
              <div className={styles.DonutChartParent}>
                <CircularProgress variant="determinate" size="11rem" value={60} className={styles.DonutChart} />
                <div className={styles.GraphContent}>
                  <img src={"/Images/satisfaction.png"} className={styles.GraphImage} />
                  <div className={styles.PercentText}>
                    60 <span className={styles.SpanPercent}>%</span>
                  </div>
                </div>
              </div>
              <div className={styles.TimePeriod}>Last Week</div>
              <div className={styles.DisplaySpace}>
                <span className={styles.GraphPercent}>72.1%</span>
                <div className={styles.WaverContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.svgStyling}>
                    <path
                      fill=" #FFC029"
                      fillOpacity="1"
                      d="M0,160L26.7,170.7C53.3,181,107,203,160,197.3C213.3,192,267,160,320,138.7C373.3,117,427,107,480,106.7C533.3,107,587,117,640,122.7C693.3,128,747,128,800,154.7C853.3,181,907,235,960,245.3C1013.3,256,1067,224,1120,213.3C1173.3,203,1227,213,1280,181.3C1333.3,149,1387,75,1413,37.3L1440,0L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
          <div className={`${styles.DashboardCard}  ${styles.BestCardPadding}`}>
            <div className={styles.DisplaySpace}>
              <div className={styles.DonutCardHeading}>Stats Overview</div>
            </div>
            <div className={`${styles.StatsText}  mt-2`}>Information about service</div>
            <div className={styles.Gender}>
              Women
              <ProgressBar now={60} variant="warning" className={styles.ProgressBarWomen} styles={{ color: "#FFC029" }} />
              <div className={styles.Scale} style={{ float: "right" }}>
                60%
              </div>
            </div>
            <div className={styles.Gender}>
              Men
              <ProgressBar now={60} variant="danger" className={styles.ProgressBarMan} />
              <div className={styles.Scale} style={{ float: "right" }}>
                60%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 ">
          <div className="time_table_card">
            <div className={styles.ColorCard}>
              <div className={styles.TimeTableDetail}>Time Table</div>
              <div className={styles.ColorCardHeading}>Working Hours</div>
              <div className={styles.DisplaySpace}>
                <div className={styles.TimeFontSize}>Mon-Fri</div>
                <div className={styles.TimeFontSize}>08am-7pm</div>
              </div>
              <div className={styles.DisplaySpace}>
                <div className={styles.TimeFontSize}>Sat-Sun</div>
                <div className={styles.TimeFontSize}>Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightSide;
