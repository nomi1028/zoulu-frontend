import React from "react";
import styles from "../../../styles/dashboard.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  scales: {
    x: {
      grid: {
        display: false,
        barThickness: 2,
      },
    },
    y: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};
const labels = [
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
];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 500, 300, 700, 500, 900, 700, 300, 700, 500, 900, 700],
      backgroundColor: "#EDEDED",
      borderRadius: 20,
    },
    {
      label: "Dataset 2",
      data: [100, 200, 900, 500, 200, 900, 700, 300, 700, 500, 900, 700],
      backgroundColor: "#30D5C8",
      borderRadius: 20,
    },
  ],
};
function Chart() {
  return (
    <div className={styles.ChartContainer}>
      <Bar options={options} data={data} />
    </div>
  );
}
export default Chart;
