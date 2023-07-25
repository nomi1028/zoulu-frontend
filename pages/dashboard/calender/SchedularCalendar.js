import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Toolbar from "react-big-calendar/lib/Toolbar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import "moment/locale/de"; // import German locale
import { useEffect } from "react";
import { Api } from "../../../utils/Api";
import BasicModal from "./ProfileModal";
var jwt = require("jsonwebtoken");
moment.locale("de", {
  week: {
    dow: 1,
  },
});
const localizer = momentLocalizer(moment);
const viewed = ["day", "week", "month", "agenda"];
var handleChange = () => {};
const dayFormat = (date, culture, localizer) => {
  return localizer.format(date, "dddd D MMMM", "de-DE");
};
export default function Calendar1() {
  const [booking, setBookings] = React.useState();
  const [revenue, setRevenue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
  const [loading, setLoading] = React.useState();
  const [confirmed, setConfirmed] = React.useState([]);
  const [weekly, setWeekly] = React.useState([]);
  const [useravailability, setAvailability] = useState([]);
  const [value, setValue] = useState();
  console.log("booking", booking);
  useEffect(() => {
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValue(token?.data?._id);
    getAvailability(token?.data?._id);
  }, [value]);
  useEffect(() => {
    if (value) getbooking();
    if (booking) {
      totalRevenue();
    }
  }, [loading, value]);

  const getbooking = async () => {
    const response = await Api("get", `api/expert/expertCalender/${value}`);

    if (response.status === 200) {
      setLoading(true);
      setBookings(response?.data?.data);
      setRevenue(response?.data?.data?.revenue);
    }
  };
  const getAvailability = async (id) => {
    if (id) {
      const response = await Api("get", `api/profile/${id}`);
      if (response) {
        if (response?.data?.data?.profile[0]?.availability.length > 1)
          setAvailability(response?.data?.data?.profile[0]?.availability);
        console.log(response?.data?.data?.profile[0]?.availability);
      }
    }
  };
  const totalRevenue = () => {
    var pastBookingarray = [];
    booking?.map((row, index) => {
      console.log(row);

      row?.products.map((value, key) => {
        if (value?.date) {
          var date = getStartTime(value?.date, value?.start_time, value);
          var now = moment();
          console.log(now, date, "testing on live");
          // if (value.status !== "pending") {
          console.log(getStartTime(value?.date, value?.start_time), "accurate");
          if (now > date) {
            pastBookingarray.push({
              title: value?.service_id?.name,
              start: getStartTime(value?.date, value?.start_time, value),
              end: getEndTime(value?.start_time, value?.duration, value?.date),
              status: "past",
              colorEvento: "#a7d08d",
              color: "#0A0425",
              userData: row?._doc?.user_id,
            });

            setConfirmed(pastBookingarray);
          } else if (now < date) {
            pastBookingarray.push({
              title: value?.service_id?.name,
              start: getStartTime(value?.date, value?.start_time, value),
              end: getEndTime(value?.start_time, value?.duration, value?.date),
              status: "upcoming",
              colorEvento: "#fcc7c0",
              color: "#0A0425",
              userData: row?._doc?.user_id,
            });
            setConfirmed(pastBookingarray);
          }
        }
      });
    });
  };
  useEffect(() => {
    if (useravailability) handleNavigation();
  }, [useravailability]);
  var handleNavigation = (date, view) => {
    console.log("New date range:", date);
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");
    const daysInMonth = [];
    var pastBookingarrays = [];
    var currentDay = startOfMonth;

    while (currentDay.isSameOrBefore(endOfMonth, "day")) {
      if (new Date() <= currentDay.toDate() && useravailability?.length > 0) {
        var result = useravailability?.find((data, index) => {
          if (data?.day == moment(currentDay).locale("de").format("dddd")) {
            return data;
          }
        });
        pastBookingarrays.push({
          title: "Verfügbarkeit",
          start: getStartTime(currentDay.toDate(), result?.start_time),
          end: getStartTime(currentDay.toDate(), result?.end_time),
          status: "Verfügbarkeit",
          colorEvento: "#bfc8eb",
          color: "#0A0425",
        });
      }
      setWeekly(pastBookingarrays);
      daysInMonth.push(currentDay.toDate());
      currentDay = currentDay.clone().add(1, "day");
    }
  };

  function getStartTime(date, start_time) {
    console.log(start_time);
    let datee = moment(date).format("YYYY-MM-DD");
    let time = start_time;
    let concaDate = datee + "T" + time;
    let newDate = new Date(concaDate);
    return newDate;
  }
  function getEndTime(start_time, min_to_add, valueDate) {
    const date = new Date(`1970-01-01T${start_time}:00`);
    date.setMinutes(date.getMinutes() + min_to_add);
    const newTimeString = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    let datee = moment(valueDate).format("YYYY-MM-DD");
    let time = newTimeString;
    let concaDate = datee + "T" + time;
    let newDate = new Date(concaDate);
    return newDate;
  }
  let change = handleChange;
  return (
    <div className="Calendar1">
      <BasicModal setOpen={(e) => setOpen(e)} open={open} data={data} />
      <Calendar
        views={viewed}
        defaultView="week"
        formats={{
          timeGutterFormat: "H:mm", // 24-hour format
          eventTimeRangeFormat: ({ start, end }) => {
            const formattedStart = moment(start).format("H:mm"); // 24-hour format
            const formattedEnd = moment(end).format("H:mm"); // 24-hour format
            // return `${formattedStart} - ${formattedEnd}`;
          },
        }}
        // events={[...confirmed, ...weekly]}
        events={[...confirmed]}
        localizer={localizer}
        showMultiDayTimes
        min={new Date(2020, 1, 0, 0, 0, 0)}
        max={new Date(2020, 1, 0, 23, 0, 0)}
        style={{ minHeight: 800 }}
        messages={{ date: "Change Date Header", event: "List" }}
        onNavigate={handleNavigation}
        BackgroundWrapper="red"
        eventPropGetter={(confirmed) => {
          const backgroundColor = confirmed.colorEvento
            ? confirmed.colorEvento
            : "blue";
          const color = confirmed.color ? confirmed.color : "blue";
          return { style: { backgroundColor, color } };
        }}
        components={{
          event: EventComponent({ confirmed, change, setOpen, setData }),
          toolbar: CustomToolbar({ confirmed, change }),
          week: {
            dateHeader: (props) => (
              <div style={{ color: "black" }}>Custom Date Header</div>
            ),
          },
        }}
      />
    </div>
  );
}
const EventComponent =
  ({ events, change, setOpen, setData }) =>
  (props) => {
    const handleClick = (event) => {
      setOpen(true);
      setData(event);
    };

    return (
      <div
        className="customEventTile"
        title="This is EventTile"
        style={{ color: "black", fontSize: "13px" }}
        onClick={() => handleClick(props.event)}
      >
        {moment(props.event?.start).format("H:mm")}-
        {moment(props.event?.end).format("H:mm")}
        <h5 style={{ color: "#0A0425", fontSize: "10px" }}>
          {props.event.title}
        </h5>
      </div>
    );
  };

var CustomToolbar = ({ handleChange }) => {
  const [forward, setForward] = useState();
  return class BaseToolBar extends Toolbar {
    constructor(props) {
      super(props);
    }
    handleDayChange = (event, mconte) => {
      mconte(event.target.value);
    };
    handleNamvigate = (detail, elem, value) => {
      console.log(detail, elem, value);
      detail.navigate(elem);
      setForward(value);
    };

    handlerdatee = () => {
      const dateString = detail?.label;
      const dateParts = dateString?.split(" ");

      let monthName = "";
      if (dateParts?.length === 2) {
        const month = new Date(`${dateParts[0]} 1, ${dateParts[1]}`);
        monthName = month.toLocaleString("default", { month: "long" });
      }

      console.log(monthName); // Output: "May"
    };
    render() {
      return (
        <div
          className="posr"
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="rbc-btn-group"
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div className="rbc-toolbar-label dateClass">
              {this.props.label}
            </div>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                display: "flex",
              }}
            >
              <div
                style={
                  forward === "a"
                    ? {
                        color: "#007FFF",
                      }
                    : null
                }
              >
                <ArrowBackIosIcon
                  onClick={() => this.handleNamvigate(this, "PREV", "a")}
                />
              </div>
              <div
                style={
                  forward === "b"
                    ? {
                        color: "#007FFF",
                      }
                    : null
                }
              >
                <ArrowForwardIosIcon
                  onClick={() => this.handleNamvigate(this, "NEXT", "b")}
                />
              </div>
            </div>
          </div>
          <div className="rbc-btn-group">
            <select
              className="form-control"
              onChange={(e) => this.handleDayChange(e, this.view)}
              defaultValue={"week"}
            >
              <option className="optionbar" value="day">
                Tag
              </option>
              <option className="optionbar" value="week">
                Woche
              </option>
              <option className="optionbar" value="month">
                Monat
              </option>
              <option className="optionbar" value="agenda">
                Tagesordnung
              </option>
            </select>
          </div>
        </div>
      );
    }
  };
};
