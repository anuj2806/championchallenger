import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Grid, Paper, Typography, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import SectionCard from "../components/SectionCard";

// Hardcoded data from the user's Excel file

// 1. Approval Rate Trend Data
const approvalRateData = [
  { month: "Sep-24", "Approval Rate": 62 },
  { month: "Oct-24", "Approval Rate": 61 },
  { month: "Nov-24", "Approval Rate": 61 },
  { month: "Dec-24", "Approval Rate": 61 },
  { month: "Jan-25", "Approval Rate": 60 },
  { month: "Feb-25", "Approval Rate": 59 },
  { month: "Mar-25", "Approval Rate": 58 },
  { month: "Apr-25", "Approval Rate": 57 },
  { month: "May-25", "Approval Rate": 57 },
  { month: "Jun-25", "Approval Rate": 56 },
  { month: "Jul-25", "Approval Rate": 56 },
  { month: "Aug-25", "Approval Rate": 55 },
];

// 2. Delinquency Rate Trend Data
const delinquencyRateData = [
  { month: "Sep-24", "Delinquency Rate": 2.5 },
  { month: "Oct-24", "Delinquency Rate": 2.6 },
  { month: "Nov-24", "Delinquency Rate": 2.7 },
  { month: "Dec-24", "Delinquency Rate": 2.6 },
  { month: "Jan-25", "Delinquency Rate": 2.8 },
  { month: "Feb-25", "Delinquency Rate": 2.9 },
  { month: "Mar-25", "Delinquency Rate": 3.0 },
  { month: "Apr-25", "Delinquency Rate": 3.1 },
  { month: "May-25", "Delinquency Rate": 3.2 },
  { month: "Jun-25", "Delinquency Rate": 3.3 },
  { month: "Jul-25", "Delinquency Rate": 3.4 },
  { month: "Aug-25", "Delinquency Rate": 3.5 },
];

// 3. Average Loan Balance Trend
const avgLoanBalanceData = [
  { month: "Sep-24", "Avg Loan Balance": 15380 },
  { month: "Oct-24", "Avg Loan Balance": 15340 },
  { month: "Nov-24", "Avg Loan Balance": 15320 },
  { month: "Dec-24", "Avg Loan Balance": 15300 },
  { month: "Jan-25", "Avg Loan Balance": 15280 },
  { month: "Feb-25", "Avg Loan Balance": 15240 },
  { month: "Mar-25", "Avg Loan Balance": 15210 },
  { month: "Apr-25", "Avg Loan Balance": 15180 },
  { month: "May-25", "Avg Loan Balance": 15120 },
  { month: "Jun-25", "Avg Loan Balance": 15090 },
  { month: "Jul-25", "Avg Loan Balance": 15050 },
  { month: "Aug-25", "Avg Loan Balance": 15000 },
];

// 4. Portfolio Profitability Trend
const portfolioProfitabilityData = [
  {
    month: "Sep-24",
    "Interest Income": 12.5,
    "Expected Loss": 3.2,
    "Acquisition Cost": 2.1,
    "Net Profit": 7.2,
  },
  {
    month: "Oct-24",
    "Interest Income": 13.2,
    "Expected Loss": 3.5,
    "Acquisition Cost": 2.2,
    "Net Profit": 7.5,
  },
  {
    month: "Nov-24",
    "Interest Income": 12.8,
    "Expected Loss": 3.4,
    "Acquisition Cost": 2.1,
    "Net Profit": 7.3,
  },
  {
    month: "Dec-24",
    "Interest Income": 13.8,
    "Expected Loss": 3.6,
    "Acquisition Cost": 2.3,
    "Net Profit": 7.9,
  },
  {
    month: "Jan-25",
    "Interest Income": 14.2,
    "Expected Loss": 3.8,
    "Acquisition Cost": 2.4,
    "Net Profit": 8.0,
  },
  {
    month: "Feb-25",
    "Interest Income": 14.9,
    "Expected Loss": 4.0,
    "Acquisition Cost": 2.5,
    "Net Profit": 8.4,
  },
  {
    month: "Mar-25",
    "Interest Income": 15.5,
    "Expected Loss": 4.2,
    "Acquisition Cost": 2.6,
    "Net Profit": 8.7,
  },
  {
    month: "Apr-25",
    "Interest Income": 16.2,
    "Expected Loss": 4.5,
    "Acquisition Cost": 2.7,
    "Net Profit": 9.0,
  },
  {
    month: "May-25",
    "Interest Income": 16.8,
    "Expected Loss": 4.7,
    "Acquisition Cost": 2.8,
    "Net Profit": 9.3,
  },
  {
    month: "Jun-25",
    "Interest Income": 17.2,
    "Expected Loss": 4.8,
    "Acquisition Cost": 2.9,
    "Net Profit": 9.5,
  },
  {
    month: "Jul-25",
    "Interest Income": 17.8,
    "Expected Loss": 5.0,
    "Acquisition Cost": 3.0,
    "Net Profit": 9.8,
  },
  {
    month: "Aug-25",
    "Interest Income": 18.5,
    "Expected Loss": 5.2,
    "Acquisition Cost": 3.1,
    "Net Profit": 10.2,
  },
];

// 5. Customer Acquisition Cost (CAC) Trend
const cacData = [
  { month: "Sep-24", CAC: 80 },
  { month: "Oct-24", CAC: 82 },
  { month: "Nov-24", CAC: 81 },
  { month: "Dec-24", CAC: 85 },
  { month: "Jan-25", CAC: 88 },
  { month: "Feb-25", CAC: 90 },
  { month: "Mar-25", CAC: 92 },
  { month: "Apr-25", CAC: 95 },
  { month: "May-25", CAC: 98 },
  { month: "Jun-25", CAC: 100 },
  { month: "Jul-25", CAC: 102 },
  { month: "Aug-25", CAC: 105 },
];

export default function PreLandingDashboard() {
  return (
    <Container sx={{ py: 1, width: "100%", flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Lending Performance Dashboard
      </Typography>
      <Grid container spacing={2}>
        {/* Approval Rate */}
        <Grid size={{ xs: 6 }}>
          <SectionCard title="Approval Rate Trend (%)">
            <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%" >
              <BarChart data={approvalRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[50, 65]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar
                  dataKey="Approval Rate"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>

        {/* Delinquency Rate */}
        <Grid size={{ xs: 6 }}>
          <SectionCard title="Delinquency Rate Trend (%)">
            <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%">
              <LineChart data={delinquencyRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[2, 4]} />
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Delinquency Rate"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>

        {/* Average Loan Balance */}
        <Grid size={{ xs: 6 }}>
          <SectionCard title="Average Loan Balance Trend ($)">
            <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%" >
              <AreaChart data={avgLoanBalanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  domain={[14800, 15500]}
                  tickFormatter={(tick) => `$${tick / 1000}k`}
                />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Avg Loan Balance"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>

        {/* Customer Acquisition Cost */}
        <Grid size={{ xs: 6 }}>
          <SectionCard title="Customer Acquisition Cost (CAC) Trend ($)">
            <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%" >
              <LineChart data={cacData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 110]} />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="CAC"
                  stroke="#ff7300"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>

        {/* Portfolio Profitability */}
        <Grid size={{ xs: 12 }}>
          <SectionCard title="Portfolio Profitability Trend ($M)">
            <Box sx={{ height: 280 }}>
            <ResponsiveContainer width="100%" >
              <BarChart data={portfolioProfitabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}M`} />
                <Legend />
                <Bar dataKey="Interest Income" stackId="a" fill="#8884d8" />
                <Bar dataKey="Expected Loss" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Acquisition Cost" stackId="a" fill="#ffc658" />
                <Bar dataKey="Net Profit" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </Container>
  );
}
