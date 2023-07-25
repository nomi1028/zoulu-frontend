import React from "react";
import dynamic from "next/dynamic";
import styles from "../../../styles/dashboard.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexLineChart = (props) => {
  const matches = useMediaQuery("(min-width:600px)");
  const series = [
    {
      name: "AAAA",
      data: props.data,
    },
  ];
  const options = {
    fill: {
      colors: props.color,
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: "undefined",
      width: 1,
      dashArray: 0,
    },
    grid: {
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },

        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    chart: {
      type: "area",
      stacked: false,
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={120}
      width={120}
    />
  );
};

export default ApexLineChart;
