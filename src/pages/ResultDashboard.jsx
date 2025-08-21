import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Box,
  Button,
  Grid,
  
} from "@mui/material";
import { motion } from "framer-motion";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/ResultDashComp/StatCard";
import RiskHeatmap from "../components/ResultDashComp/RiskHeatmap";
import DrilldownList from "../components/ResultDashComp/DrilldownList";
import MetricsTable from "../components/ResultDashComp/MetricsTable";

const METRICS = {
  approvalChampion: 62,
  approvalChallenger: 68,
  defaultChampion: 4.2,
  defaultChallenger: 4.9,
  revenueChampion: 320,
  revenueChallenger: 345,
  tatChampion: 150,
  tatChallenger: 180,
};

const approvalBarData = [
  { name: "Champion v1.0", Approval: METRICS.approvalChampion },
  { name: "Challenger v1.1", Approval: METRICS.approvalChallenger },
];

const declineReasons = [
  { name: "Low Score", value: 38 },
  { name: "High DTI", value: 24 },
  { name: "Income Mismatch", value: 16 },
  { name: "Fraud Flags", value: 8 },
  { name: "Others", value: 14 },
];

const RISK_BUCKETS = ["A", "B", "C"];
const riskMigration = [
  [55, 6, 1, 0, 0],
  [4, 43, 7, 1, 0],
  [1, 6, 33, 6, 1]
];

const PIE_COLORS = ["#1E88E5", "#43A047", "#FB8C00", "#8E24AA", "#546E7A"];

const ResultDashboard = ({selectedChampion, selectedChallenger,handlePromote,handleReject}) => {

  return (
    <Grid
     size={{ xs: 12}}
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <SectionCard
        title={`Simulation Results — ${selectedChampion} vs ${selectedChallenger}`}
        actions={
          <Box display="flex" gap={1}>
            <Button
              color="success"
              startIcon={<CheckCircleIcon />}
              variant="contained"
              onClick={handlePromote}
            >
              Promote Challenger
            </Button>
            <Button
              color="inherit"
              startIcon={<CancelIcon />}
              variant="outlined"
              onClick={handleReject}
            >
              Reject
            </Button>
          </Box>
        }
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 3}}>
            <StatCard
              title="Approval Rate"
              left={METRICS.approvalChampion}
              right={METRICS.approvalChallenger}
              delta={METRICS.approvalChallenger - METRICS.approvalChampion}
            />
          </Grid>
          <Grid size={{ xs: 3}}>
            <StatCard
              title="Default Rate"
              left={METRICS.defaultChampion}
              right={METRICS.defaultChallenger}
              delta={Number(
                (METRICS.defaultChallenger - METRICS.defaultChampion).toFixed(1)
              )}
              goodIsUp={false}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <StatCard
              title="Revenue / Loan ($)"
              left={METRICS.revenueChampion}
              right={METRICS.revenueChallenger}
              delta={METRICS.revenueChallenger - METRICS.revenueChampion}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <StatCard
              title="TAT (latency)"
              left={METRICS.tatChampion}
              right={METRICS.tatChallenger}
              delta={METRICS.tatChallenger - METRICS.tatChampion}
              goodIsUp={false}
            />
          </Grid>

          <Grid size={{ xs: 6}}> 
            <SectionCard title="Approval % by Version">
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={approvalBarData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ReTooltip />
                    <Legend />
                    <Bar
                      dataKey="Approval"
                      fill="#1E88E5"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 6}}>
            <SectionCard title="Decline Reasons (Challenger)">
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={declineReasons}
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={110}
                      label
                    >
                      {declineReasons.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ReTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 6}}>
            <SectionCard
            //   title="Risk Grade Migration (Champion → Challenger)"
              title="Side by Side Metrics"
              sx={{ overflowX: "auto" }}
            >
              {/* <RiskHeatmap buckets={RISK_BUCKETS} matrix={riskMigration} /> */}
              <MetricsTable/> 
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 6}}>
            <SectionCard title="Application Drill-down (sample)">
              <DrilldownList />
            </SectionCard>
          </Grid>
        </Grid>
      </SectionCard>
    </Grid>
  );
};

export default ResultDashboard;
