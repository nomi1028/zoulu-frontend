import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// export const options = {
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//   },
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: false,
//     },
//     title: {
//       display: false,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };
// const labels = ["Aug 12", "Aug 13", "Aug 14", "Aug 15", "Aug 16", "Aug 17", "Aug 18"];
// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Revenue",
//       data: [100, 200, 300, 150, 500, 350, 700],
//       backgroundColor: "#007FFF",
//     },
//   ],
// };
function FinanceChart({ chart }) {
  return chart && <Bar height={75} options={chart.options} data={chart.data} />;
}
export default FinanceChart;
