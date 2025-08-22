import React, { use, useEffect } from "react";
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
  LineChart,
  Line,
} from "recharts";
import {
  Box,
  Button,
  Grid,
  
} from "@mui/material";
import { motion } from "framer-motion";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/ResultDashComp/StatCard";
import DrilldownList from "../components/ResultDashComp/DrilldownList";
import MetricsTable from "../components/ResultDashComp/MetricsTable";
import GroupedBarChart from "../components/ResultDashComp/GroupedBarChart";
import TATBarChart from "../components/ResultDashComp/TATBarChart";

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

const tatData = [
  { version: "v1.0", Champion: METRICS.tatChampion, Challenger: METRICS.tatChallenger },
  { version: "v1.1", Champion: METRICS.tatChampion, Challenger: METRICS.tatChallenger },
];

const ResultDashboard = ({handlePromote,handleReject,ruleOutput}) => {
  useEffect(() => {
    // Handle side effects here


  }, [ ruleOutput]);

  return (
    <Grid
     size={{ xs: 12}}
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <SectionCard
        title="Simulation Results"
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
          <Grid size={{ xs: 6, md:3 }}>  
            <StatCard
              title="Approval Rate"
              left={METRICS.approvalChampion}
              right={METRICS.approvalChallenger}
              delta={METRICS.approvalChallenger - METRICS.approvalChampion}
            />
          </Grid>
          <Grid size={{ xs: 6, md:3 }}>
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
          <Grid size={{ xs: 6, md:3 }}>
            <StatCard
              title="Revenue / Loan ($)"
              left={METRICS.revenueChampion}
              right={METRICS.revenueChallenger}
              delta={METRICS.revenueChallenger - METRICS.revenueChampion}
            />
          </Grid>
          <Grid size={{ xs: 6, md:3 }}> 
            <StatCard
              title="TAT (latency)"
              left={METRICS.tatChampion}
              right={METRICS.tatChallenger}
              delta={METRICS.tatChallenger - METRICS.tatChampion}
              goodIsUp={false}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6}}>  
            <SectionCard title="Category-Wise Rule Performance Chart">
              <Box sx={{ height: 280 }}>
                <GroupedBarChart ruleOutput={ruleOutput} />
              </Box>
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 12,md:6}}> 
            <SectionCard title="TAT (LATENCY)">
              <Box sx={{ height: 280 }}>
                <TATBarChart apiOutput={ruleOutput} />
              </Box>
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 12}}>
            <SectionCard
            //   title="Risk Grade Migration (Champion → Challenger)"
              title="Side by Side Metrics"
              sx={{ overflowX: "auto" }}
            >
              {/* <RiskHeatmap buckets={RISK_BUCKETS} matrix={riskMigration} /> */}
              <MetricsTable ruleOutput={ruleOutput}/> 
            </SectionCard>
          </Grid>

          <Grid size={{ xs: 12}}> 
            <SectionCard title="Application Drill-down (sample)">
              <DrilldownList ruleOutput={ruleOutput}/>
            </SectionCard>
          </Grid>
        </Grid>
      </SectionCard>
    </Grid>
  );
};

export default ResultDashboard;
