import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { useTransactionContext } from "../../context/TransactionContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Analytics.scss";
import "chart.js/auto";
import BalanceDisplay from "../../components/BalanceDisplay/BalanceDisplay";

const Analytics: React.FC = () => {
  const { transactions } = useTransactionContext();

  const [categoryData, setCategoryData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [
      {
        label: "Expenses by Category",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const [monthlyData, setMonthlyData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [
      {
        label: "Monthly Expenses",
        data: [],
        backgroundColor: "#36A2EB",
      },
    ],
  });

  useEffect(() => {
    const categories = transactions.reduce(
      (acc: Record<string, number>, transaction) => {
        const category = transaction.category;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
      },
      {}
    );

    const months = transactions.reduce(
      (acc: Record<string, number>, transaction) => {
        const month = new Date(transaction.date).toLocaleString("default", {
          month: "long",
        });
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += transaction.amount;
        return acc;
      },
      {}
    );

    setCategoryData({
      labels: Object.keys(categories),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categories),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    });

    setMonthlyData({
      labels: Object.keys(months),
      datasets: [
        {
          label: "Monthly Expenses",
          data: Object.values(months),
          backgroundColor: "#36A2EB",
        },
      ],
    });
  }, [transactions]);

  return (
    <div className="analytics-container">
      <Navbar />
      <BalanceDisplay />
      <h2>Analytics</h2>
      <div>
        <h3>Expenses by Category</h3>
        <Pie data={categoryData} />
      </div>
      <div style={{ marginTop: "50px" }}>
        <h3>Monthly Expenses</h3>
        <Bar data={monthlyData} />
      </div>
    </div>
  );
};

export default Analytics;
