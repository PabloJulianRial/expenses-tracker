import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { useTransactionContext } from "../../context/TransactionContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Analytics.scss";
import "chart.js/auto";

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

  const [selectedMonth, setSelectedMonth] = useState<string>("All");

  const updateCategoryData = (month: string) => {
    const filteredTransactions =
      month === "All"
        ? transactions
        : transactions.filter(
            (transaction) =>
              new Date(transaction.date).toLocaleString("default", {
                month: "long",
                year: "numeric",
              }) === month
          );

    const categories = filteredTransactions.reduce(
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
  };

  useEffect(() => {
    const months = transactions.reduce(
      (acc: Record<string, number>, transaction) => {
        const month = new Date(transaction.date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += transaction.amount;
        return acc;
      },
      {}
    );

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

    updateCategoryData("All");
  }, [transactions]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setSelectedMonth(month);
    updateCategoryData(month);
  };

  return (
    <div className="analytics-container">
      <Navbar />
      <h2>Analytics</h2>

      <div>
        <h3>Expenses by Category</h3>
        <div className="chart-controls">
          <label htmlFor="month-select">Select Month:</label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="All">All</option>
            {monthlyData.labels?.map((month, index) => (
              <option key={index} value={String(month)}>
                {String(month)}
              </option>
            ))}
          </select>
        </div>
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
