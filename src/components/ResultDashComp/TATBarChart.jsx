import { useTheme } from "@emotion/react";
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
        const theme = useTheme(); 

  if (!apiOutput || !apiOutput.summary) return <p>No data available</p>;

  // Transform API data for Recharts
  const chartData = apiOutput.summary.map((item) => ({
    rule: item.ruleName,
    latency: item.avgTime/1000
  }));

  return (
    <ResponsiveContainer width="100%" >
      <BarChart
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rule" fontSize={12} />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toFixed(2)} s`} /> 
        <Legend />
        <Bar dataKey="latency" fill={theme.palette.negative} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TATBarChart;
