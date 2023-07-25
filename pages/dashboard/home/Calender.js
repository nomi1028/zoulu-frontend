// import { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// function Calender() {
//   const [date, setDate] = useState(new Date());

//   return (
//     <div>
//       <Calendar onChange={setDate} value={date} selectRange={true} />
//     </div>
//   );
// }

// export default Calender;

import React, { useState, useEffect } from "react";
import { CCard, CCardBody } from "@coreui/react";
import moment from "moment";
import styles from "../../../styles/dashboardProfile.module.css";
// import "./calender.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import { Api } from "../../utils/Api";
import CreateIcon from "@mui/icons-material/Create";
// import UpdateAttendance from "./UpdateAttendance";
// import Loader from "../../components/Custom/Loader";
const Calender = (props) => {
  const [loading, setLoading] = useState(false);
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
  // const [attendance, setAttendances] = useState([]);
  // const [updateAttendance, setUpdateAttendance] = useState(false);
  // const [currentAttendance, setCurrentAttendance] = useState(null);
  // const [attendanceIndex, setAttendanceIndex] = useState(null);
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
        <CCardBody style={{paddingLeft:"0px"}}>
          <div className="d-flex flex-wrap justify-content-between align-item-center">
            {/* <div className="calender_title"></div> */}
            <div className="formatted_currentMonth-SmCld">
              january, 2022
              <KeyboardArrowLeftIcon className={styles.LeftIconCalender} />
              {/* {`${state.startOf Month} ${state.currentMonth} - ${state.endOfMonth} ${state.currentMonth} `} */}
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
                  {/* {getAttendanceStatusForEachDay(day)} */}
                  <CreateIcon onClick={() => update(day, index)} className="updateAtt_icon" />
                </div>
              </React.Fragment>
            ))}
          </div>
        </CCardBody>
      </CCard>
      {/* <UpdateAttendance
        // showModal={updateAttendance}
        // currentAttendance={currentAttendance}
        // attendanceIndex={attendanceIndex}
        // attendance={attendance}
        // setAttendances={setAttendances}
        // hideModal={() => {
        //   setAttendanceIndex(null);
        //   setCurrentAttendance(null);
        //   setUpdateAttendance(false);
        // }}
      /> */}
    </React.Fragment>
  );
};

export default Calender;

const EntryContainer = (status = "Entry", date = "10:00 AM") => {
  return (
    <div className="entryContainer">
      <div>
        <div className="status">{status}</div>
        <div className="status_time">{formatTime(date)}</div>
      </div>
      <div className="entry_status_line" />
    </div>
  );
};
const LateEntryContainer = (status = "Late Entry", date = "10:00 AM") => {
  return (
    <div className="lateContainer">
      <div>
        <div className="late_status">{status}</div>
        <div className="status_time">{formatTime(date)}</div>
      </div>
      <div className="late_status_line" />
    </div>
  );
};
const ExitContainer = (status = "Exit", date = "10:00 AM") => {
  return (
    <div className="exitContainer">
      <div>
        <div className="exit_status">{status}</div>
        <div className="status_time">{formatTime(date)}</div>
      </div>
      <div className="exit_status_line" />
    </div>
  );
};
const AbsentContainer = () => {
  return (
    <div className="absentContainer">
      <div>
        <div className="absent_status">Absent</div>
      </div>
      <div className="absent_status_line" />
    </div>
  );
};
const PaidLeaveContainer = (status) => {
  return (
    <div className="paidContainer">
      <div>
        <div className="paid_status">Paid Leave</div>
      </div>
      <div className="paid_status_line" />
    </div>
  );
};
const UnPaidLeaveContainer = () => {
  <div className="unPaidContainer">
    <div>
      <div className="unPaid_status">Unpiad</div>
      <div className="unpiad_status_time">Approved leave</div>
    </div>
    <div className="unPaid_status_line" />
  </div>;
};
const getMonthValueByName = (n) => "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(n) / 3 + 1;
const getDate = (e) => e.toString();
const formatTime = (time) => {
  let date = time.split(":");
  let hours = date[0];
  let minutes = date[1];
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let currentTime = hours + ":" + minutes + " " + ampm;
  return currentTime;
};
