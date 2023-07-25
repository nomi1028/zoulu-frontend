import React, { useEffect, useState } from "react";
import LeftSide from "./dashboard/home/LeftSide";
import RightSide from "./dashboard/home/RightSide";
import SidebarWrapper from "./dashboard/SideBarWrapper";
import AuthProtected from "../utils/AuthProtected";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { Api } from "../utils/Api";
import moment from "moment";
const DashboardIndex = () => {
  const [availability, setAvailability] = useState([]);
  const [dashbaordData, setDashbaordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(moment().year());
  const [chart, setChart] = useState({
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "#007FFF",
          borderRadius: 20,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: true,
            color: "rgba(0, 0, 0, 0.2)", // Adjust the color of the grid lines if needed
            borderDash: [3, 3], // Make the grid lines appear as dotted lines
            drawBorder: false, // Remove the left grid line
            drawTicks: false, // Remove the tick marks on the left side
          },
          ticks: {
            display: true, // Display the tick labels on the left side
            beginAtZero: true,
            padding: 13, // Adjust the padding value to add space on the left side of the tick labels
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false, text: "Chart.js Bar Chart" },
      },
    },
  });
  const getAvailability = async () => {
    setLoading(true);
    const response = await Api(
      "get",
      `api/profile/${
        typeof window !== "undefined"
          ? jwt.decode(localStorage.getItem("zolu-auth-token"))?.data?._id
          : null
      }`
    );
    if (response.status === 200) {
      setLoading(false);
      setAvailability(response.data.data?.profile[0]?.availability);
    } else {
      setLoading(false);
      toast.error(response.data.msg);
    }
  };
  const getDashbaordData = async () => {
    setLoading(true);
    const response = await Api(
      "get",
      `api/expert/dashboard/${
        typeof window !== "undefined"
          ? jwt.decode(localStorage.getItem("zolu-auth-token"))?.data?._id
          : null
      }?year=${year ? year : ""}`
    );
    if (response.status === 200) {
      setDashbaordData(response.data.data);
      const bookingArray = response.data.data?.yearlyBookings;
      let months = [];
      let revenue = [];
      let year = moment().format("YYYY");
      for (let i = 0; i < 12; i++) {
        const month = moment().year(year).month(i);
        const monthName = month.format("MMM");
        months.push(monthName);
        const revenueSum = bookingArray.reduce((sum, item) => {
          const itemMonth = moment(item?.date).format("MMM");
          if (itemMonth === monthName) {
            return sum + item?.charges;
          }
          return sum;
        }, 0);
        revenue.push(revenueSum);
        setChart({
          ...chart,
          data: {
            ...chart.data,
            labels: months,
            datasets: [
              {
                data: revenue,
                backgroundColor: "#007FFF",
                borderRadius: 20,
                barPercentage: 0.2,
              },
            ],
          },
        });
      }
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.data.msg);
    }
  };
  useEffect(() => {
    getAvailability();
  }, []);
  useEffect(() => {
    getDashbaordData();
  }, [year]);
  return (
    <SidebarWrapper>
      {loading ? <Loader /> : null}
      <div className="container-fluid margin-sidebar ">
        <div className="row pt-3 ">
          <div className="col-xl-12 col-lg-12 col-xl-12 col-md-12 pad-small-zero">
            <LeftSide
              dashbaordData={dashbaordData}
              chart={chart}
              setYear={setYear}
              year={year}
            />
          </div>
          {/* <div className="col-xl-4 col-lg-12 col-xl-4 col-md-12 pad-small-zero">
            <RightSide availability={availability} dashbaordData={dashbaordData} />
          </div> */}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default AuthProtected(DashboardIndex);
