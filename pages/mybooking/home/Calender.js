import React, { useState, useEffect } from "react";
import { CCard, CCardBody } from "@coreui/react";
import moment from "moment";
import styles from "../../../styles/dashboardProfile.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CreateIcon from "@mui/icons-material/Create";
const Calender = (props) => {
  const [state, setState] = useState({
    addNew: false,
    monthCount: 0,
    date: "",
    totalDays: [],
    skipDays: [],
    schedules: [],
    orders: [],
    loading: false,
    confirm: false,
    scheduleId: 0,
    attendance: [],
    currentMonth: new Date(new Date().getFullYear(), new Date().getMonth()).toLocaleDateString("en-US", { year: "numeric", month: "short" }),
    startOfMonthDay: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDay(),
    daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    today: String(new Date().getDate()).padStart(2, "0"),
    startOfMonth: moment(new Date(new Date().getFullYear(), new Date().getMonth()).toLocaleDateString("en-US", { year: "numeric", month: "short" }))
      .clone()
      .startOf("month")
      .format("DD"),
    endOfMonth: moment(new Date(new Date().getFullYear(), new Date().getMonth()).toLocaleDateString("en-US", { year: "numeric", month: "short" }))
      .clone()
      .endOf("month")
      .format("DD"),
  });
  useEffect(() => {
    let totalDays = [],
      skipDays = [];
    for (let i = 0; i < parseInt(state.daysInMonth); i++) {
      totalDays.push(i + 1);
    }
    for (let i = 0; i < parseInt(state.startOfMonthDay); i++) {
      skipDays.push(i + 1);
    }
    setState({ ...state, totalDays, skipDays });
  }, [state.monthCount]);
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  return (
    <React.Fragment>
      <CCard style={{ border: "0px solid transparent" }}>
        <CCardBody style={{ paddingLeft: "0px" }}>
          <div className="d-flex flex-wrap justify-content-between align-item-center">
            <div className="formatted_currentMonth-SmCld">
              january, 2022
              <KeyboardArrowLeftIcon className={styles.LeftIconCalender} />
              <KeyboardArrowRightIcon className={styles.RightIconCalender} />
            </div>
            <div> </div>
          </div>
          <div className={`${styles.SevenCols} mt-4`}>
            <div className={`${styles.HeaderCol} firstheader ${styles.ColHeading}`}>Mon</div>
            <div className={`${styles.HeaderCol} firstheader ${styles.ColHeading}`}>Tue</div>
            <div className={`${styles.HeaderCol} firstheader ${styles.ColHeading}`}>Wed</div>
            <div className={`${styles.HeaderCol} firstheader ${styles.ColHeading}`}>Thu</div>
            <div className={`${styles.HeaderCol} firstheader ${styles.ColHeading}`}>Fri</div>
            <div className={`${styles.HeaderCol} firstheader ${styles.ColHeading}`}>Sat</div>
            <div className={`${styles.HeaderCol} firstheader ${styles.ColHeading}`}>Sun</div>
          </div>
          <div className={styles.SevenCols}>
            {state.totalDays.map((day, index) => (
              <React.Fragment key={index}>
                {day === 1 && state.skipDays.map((skipDay, skipDay_i) => <div key={skipDay_i} className={"custom-col"} style={{ border: "none" }}></div>)}
                <div
                  className={`custom-col date-style calender-day-date   ${cDay === day && "activeDay"}`}
                  style={{
                    position: "relative",
                    color: "black",
                  }}
                >
                  <div className="calender-day-date-child ">{day}</div>
                  <CreateIcon onClick={() => update(day, index)} className="updateAtt_icon" />
                </div>
              </React.Fragment>
            ))}
          </div>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};
export default Calender;
