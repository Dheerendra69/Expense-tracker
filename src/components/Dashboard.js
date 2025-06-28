import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Dashboard.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = ({ expenses }) => {
  const categoryTotals = {};
  const monthlyTotals = {};

  expenses.forEach(({ amount, category, date }) => {
    const month = new Date(date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    categoryTotals[category] = (categoryTotals[category] || 0) + Number(amount);
    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(amount);
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#f87171",
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#a78bfa",
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyTotals),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Dashboard</h3>
      <div className="charts-container">
        <div className="chart-card">
          <h4 className="chart-title">Category Distribution</h4>
          <Pie data={pieData} />
        </div>
        <div className="chart-card">
          <h4 className="chart-title">Monthly Expenses</h4>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
