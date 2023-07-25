import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
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
const labels = ["Aug 12", "Aug 13", "Aug 14", "Aug 15", "Aug 16", "Aug 17", "Aug 18"];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 400, 100, 400, 300, 600, 700],
      backgroundColor: "#EDEDED",
    },
    {
      label: "Dataset 2",
      data: [100, 200, 300, 400, 500, 600, 700],
      backgroundColor: "#30D5C8",
    },
  ],
};
function FinanceChart() {
  return <Bar height={75} options={options} data={data} />;
}
export default FinanceChart;
