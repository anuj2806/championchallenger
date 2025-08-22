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

const TATBarChart = ({ apiOutput }) => {
  if (!apiOutput || !apiOutput.summary) return <p>No data available</p>;

  // Transform API data for Recharts
  const chartData = apiOutput.summary.map((item) => ({
    rule: item.ruleName,
    latency: item.avgTimeMs
  }));

  return (
    <ResponsiveContainer width="100%" >
      <BarChart
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rule" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toFixed(2)} ms`} />
        <Legend />
        <Bar dataKey="latency" fill="#e67496ff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TATBarChart;
