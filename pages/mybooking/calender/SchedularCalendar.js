import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Toolbar from "react-big-calendar/lib/Toolbar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import { useEffect } from "react";
import { Api } from "../../../utils/Api";
var jwt = require("jsonwebtoken");
// const data = [
//   {
//     id: 0,
//     title: "All Day Event very long title",
//     allDay: true,
//     start: new Date(2015, 3, 0),
//     end: new Date(2015, 3, 1),
//   },
//   {
//     id: 1,
//     title: "Long Event",
//     start: new Date(2015, 3, 7),
//     end: new Date(2015, 3, 10),
//   },

//   {
//     id: 2,
//     title: "DTS STARTS",
//     start: new Date(2016, 2, 13, 0, 0, 0),
//     end: new Date(2016, 2, 20, 0, 0, 0),
//   },

//   {
//     id: 3,
//     title: "DTS ENDS",
//     start: new Date(2016, 10, 6, 0, 0, 0),
//     end: new Date(2016, 10, 13, 0, 0, 0),
//   },

//   {
//     id: 4,
//     title: "Some Event",
//     start: new Date(2015, 3, 9, 0, 0, 0),
//     end: new Date(2015, 3, 10, 0, 0, 0),
//   },
//   {
//     id: 5,
//     title: "Conference",
//     start: new Date(2015, 3, 11),
//     end: new Date(2015, 3, 13),
//     desc: "Big conference for important people",
//   },
//   {
//     id: 6,
//     title: "Meeting",
//     start: new Date(2015, 3, 12, 10, 30, 0, 0),
//     end: new Date(2015, 3, 12, 12, 30, 0, 0),
//     desc: "Pre-meeting meeting, to prepare for the meeting",
//   },
//   {
//     id: 7,
//     title: "Lunch",
//     start: new Date(2015, 3, 12, 12, 0, 0, 0),
//     end: new Date(2015, 3, 12, 13, 0, 0, 0),
//     desc: "Power lunch",
//   },
//   {
//     id: 8,
//     title: "Meeting",
//     start: new Date(2015, 3, 12, 14, 0, 0, 0),
//     end: new Date(2015, 3, 12, 15, 0, 0, 0),
//   },
//   {
//     id: 9,
//     title: "Happy Hour",
//     start: new Date(2015, 3, 12, 17, 0, 0, 0),
//     end: new Date(2015, 3, 12, 17, 30, 0, 0),
//     desc: "Most important meal of the day",
//   },
//   {
//     id: 10,
//     title: "Dinner",
//     start: new Date(2015, 3, 12, 20, 0, 0, 0),
//     end: new Date(2015, 3, 12, 21, 0, 0, 0),
//   },
//   {
//     id: 11,
//     title: "Planning Meeting with Paige",
//     start: new Date(2015, 3, 13, 8, 0, 0),
//     end: new Date(2015, 3, 13, 10, 30, 0),
//   },
//   {
//     id: 11.1,
//     title: "Inconvenient Conference Call",
//     start: new Date(2015, 3, 13, 9, 30, 0),
//     end: new Date(2015, 3, 13, 12, 0, 0),
//   },
//   {
//     id: 11.2,
//     title: "Project Kickoff - Lou's Shoes",
//     start: new Date(2015, 3, 13, 11, 30, 0),
//     end: new Date(2015, 3, 13, 14, 0, 0),
//   },
//   {
//     id: 11.3,
//     title: "Quote Follow-up - Tea by Tina",
//     start: new Date(2015, 3, 13, 15, 30, 0),
//     end: new Date(2015, 3, 13, 16, 0, 0),
//   },
//   {
//     id: 12,
//     title: "Late Night Event",
//     start: new Date(2015, 3, 17, 19, 30, 0),
//     end: new Date(2015, 3, 18, 2, 0, 0),
//   },
//   {
//     id: 12.5,
//     title: "Late Same Night Event",
//     start: new Date(2015, 3, 17, 19, 30, 0),
//     end: new Date(2015, 3, 17, 23, 30, 0),
//   },
//   {
//     id: 13,
//     title: "Multi-day Event",
//     start: new Date(2015, 3, 20, 19, 30, 0),
//     end: new Date(2015, 3, 22, 2, 0, 0),
//   },
//   {
//     id: 14,
//     title: "Today",
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3)),
//   },
//   {
//     id: 15,
//     title: "Nouman",
//     start: new Date("2023-01-25T06:57:21.060Z"),
//     end: new Date("2023-01-25T07:57:21.060Z"),
//   },

//   {
//     id: 17,
//     title: "Dutch Song Producing",
//     start: new Date(2015, 3, 14, 16, 30, 0),
//     end: new Date(2015, 3, 14, 20, 0, 0),
//   },
//   {
//     id: 18,
//     title: "Itaewon Halloween Meeting",
//     start: new Date(2015, 3, 14, 16, 30, 0),
//     end: new Date(2015, 3, 14, 17, 30, 0),
//   },
//   {
//     id: 19,
//     title: "Online Coding Test",
//     start: new Date(2015, 3, 14, 17, 30, 0),
//     end: new Date(2015, 3, 14, 20, 30, 0),
//   },
//   {
//     id: 20,
//     title: "An overlapped Event",
//     start: new Date(2015, 3, 14, 17, 0, 0),
//     end: new Date(2015, 3, 14, 18, 30, 0),
//   },
//   {
//     id: 21,
//     title: "Phone Interview",
//     start: new Date(2015, 3, 14, 17, 0, 0),
//     end: new Date(2015, 3, 14, 18, 30, 0),
//   },
//   {
//     id: 22,
//     title: "Cooking Class",
//     start: new Date(2015, 3, 14, 17, 30, 0),
//     end: new Date(2015, 3, 14, 19, 0, 0),
//   },
//   {
//     id: 23,
//     title: "Go to the gym",
//     start: new Date(2015, 3, 14, 18, 30, 0),
//     end: new Date(2015, 3, 14, 20, 0, 0),
//   },
// ];
// const data = [
//   {
//     // title: "My Event",
//     title: "relaxing massage",
//     start: new Date("2023-01-25T02:57:21.060Z"),
//     end: new Date("2023-01-25T05:57:21.060Z"),
//     // elcolor:'red'

//     colorEvento: "#a7d08d",
//     color: "#0A0425",
//   },

//   {
//     title: "Organic Massage",
//     start: new Date("2023-01-27T06:57:21.060Z"),
//     end: new Date("2023-01-27T09:57:21.060Z"),
//     colorEvento: "#fcc7c0",
//     color: "#0A0425",
//   },
//   {
//     title: "nails",
//     start: new Date("2023-01-26T04:57:21.060Z"),
//     end: new Date("2023-01-26T07:57:21.060Z"),
//     colorEvento: "#bfc8eb",
//     color: "#0A0425",
//   },
// ];
// console.log(data);
moment.locale("es", {
  week: {
    dow: 1, // for starrting day from monday
  },
});
const localizer = momentLocalizer(moment);
const viewed = ["day", "week", "month", "agenda"];

var handleNavigation = (date, view, action) => {
  console.log(date, view, action);
  //it returns current date, view options[month,day,week,agenda] and action like prev, next or today
};
var handleChange = () => {
  console.log("this block code executed");
};
const dayFormat = (date, culture, localizer) => {
  return localizer.format(date, "dddd D MMMM", culture);
};

export default function Calendar1() {
  const [booking, setBookings] = React.useState();
  const [revenue, setRevenue] = React.useState(0);
  const [loading, setLoading] = React.useState();
  const [confirmed, setConfirmed] = React.useState();
  const [pending, setPending] = React.useState();
  const [status, setStatus] = useState("Confirmed");
  const [value, setValue] = useState();
  useEffect(() => {
    console.log("useEffect is running");
    let token = jwt.decode(window.localStorage.getItem("zolu-auth-token"));
    setValue(token?.data?.expert?._id);
  }, [value]);
  useEffect(() => {
    if (value) getbooking();
    if (booking) {
      totalRevenue();
    }
  }, [loading, value]);
  const getbooking = async () => {
    const response = await Api(
      "get",
      `api/expert/getRevenue?expertId=${value}`
    );
    if (response.status === 200) {
      setLoading(true);
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
            colorEvento: "#a7d08d",
            color: "#0A0425",
          });
          setConfirmed(pastBookingarray);
        } else if (now < date) {
          pastBookingarray.push({
            title: data?.title,
            start: new Date(data?.start),
            end: new Date(data?.end),
            status: "upcoming",
            colorEvento: "#fcc7c0",
            color: "#0A0425",
          });
          setConfirmed(pastBookingarray);
          // pendingarray.push(data);
          // setPending(pendingarray);
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
  let change = handleChange;

  return (
    <div className="Calendar1">
      <Calendar
        views={viewed}
        //available views from array
        defaultView="week"
        //default week view is selected
        formats={{
          dayFormat,
        }}
        events={confirmed}
        localizer={localizer}
        showMultiDayTimes
        //display events with multiday selection
        min={new Date(2020, 1, 0, 0, 0, 0)}
        max={new Date(2020, 1, 0, 23, 0, 0)}
        style={{ minHeight: 800 }}
        //min max determine timerange on left side
        messages={{ date: "Change Date Header", event: "List" }}
        //msg comes on navigating dates when no events available in agenda view
        // you can use any custom functional component for display these kind of messages
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
          event: EventComponent({ confirmed, change }),
          //data as events array and change is custom method passed into component(for perform any functionality on parent state)
          toolbar: CustomToolbar({ confirmed, change }),
          week: {
            dateHeader: (props) => (
              <div style={{ color: "red" }}>Custom Date Header</div>
            ),
          },
        }}
      />
    </div>
  );
}
// design html for event tile
const EventComponent =
  ({ events, change }) =>
  (props) => {
    return (
      <div
        className="customEventTile"
        title="This is EventTile"
        style={{ Color: "red" }}
      >
        <h5 style={{ color: "#0A0425", fontSize: "10px" }}>
          {props.event.title}
        </h5>
      </div>
    );
  };
// design custom design or elements for top navigation toolbaar, for today, next, prev or all views

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
      detail.navigate(elem);
      setForward(value);
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
                // color: "#30D5C8",
              }}
            >
              <div
                style={
                  forward === "a"
                    ? {
                        color: "#30D5C8",
                      }
                    : null
                }
              >
                {" "}
                <ArrowBackIosIcon
                  onClick={() => this.handleNamvigate(this, "PREV", "a")}
                />
              </div>
              <div
                style={
                  forward === "b"
                    ? {
                        color: "#30D5C8",
                      }
                    : null
                }
              >
                {" "}
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
                Day
              </option>
              <option className="optionbar" value="week">
                Week
              </option>
              <option className="optionbar" value="month">
                Month
              </option>
              <option className="optionbar" value="agenda">
                Agenda
              </option>
            </select>
          </div>
        </div>
      );
    }
  };
};
