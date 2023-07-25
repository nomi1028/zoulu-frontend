import React, { useState } from "react";
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

function Chart(props) {
  const { chart } = props;
  console.log(chart);
  // const [chart, setChart] = useState({
  //   data: {
  //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],

  //     datasets: [
  //       {
  //         data: [100, 200, 900, 500, 200, 900, 700, 300, 700, 500, 900, 700],
  //         backgroundColor: "#007FFF",
  //         borderRadius: 20,
  //       },
  //     ],
  //   },
  //   options: {
  //     scales: { x: { grid: { display: false } }, y: { display: false } },
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     plugins: { legend: { display: false }, title: { display: false, text: "Chart.js Bar Chart" } },
  //   },
  // });
  return (
    <div className={styles.ChartContainer}>
      {chart && <Bar options={chart?.options} data={chart?.data} />}
    </div>
  );
}
export default Chart;
