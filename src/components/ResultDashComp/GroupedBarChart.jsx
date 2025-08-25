import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

const GroupedBarChart = ({ ruleOutput }) => {
  if (!ruleOutput || !ruleOutput.summary) return <p>No data available</p>;

  // Extract rule names dynamically
  const ruleNames = ruleOutput.summary.map(item => item.ruleName);

  // Transform into grouped format
  const chartData = [
    {
      category: "Approve",
      ...ruleOutput.summary.reduce((acc, item) => {
        acc[item.ruleName] = item.approvePercent;
        return acc;
      }, {})
    },
    {
      category: "Review",
      ...ruleOutput.summary.reduce((acc, item) => {
        acc[item.ruleName] = item.reviewPercent;
        return acc;
      }, {})
    },
    {
      category: "Decline",
      ...ruleOutput.summary.reduce((acc, item) => {
        acc[item.ruleName] = item.declinePercent;
        return acc;
      }, {})
    }
  ];

  // Colors for each rule (generate or set fixed palette)
  const colors = ["#1E88E5", "#43A047", "#F4511E", "#8E24AA", "#FDD835"];

  return (
    <ResponsiveContainer width="100%" >
      <BarChart
        data={chartData}
        
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        {ruleNames.map((rule, index) => (
          <Bar
            key={rule}
            dataKey={rule}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GroupedBarChart;
