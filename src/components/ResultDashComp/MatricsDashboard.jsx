import React from "react";
import { Grid, Typography } from "@mui/material";
import StatCard from "./StatCard";

const MetricsDashboard = ({ summary }) => {
  if (!summary || summary.length === 0) return null;

  const champion = summary[0]; // First one is champion
  const challengers = summary.slice(1); // Rest are challengers

  return (
    <Grid container spacing={2}> 
      {challengers.map((challenger) => (
        <React.Fragment key={challenger.ruleName}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
              {challenger.ruleName}
            </Typography>
          </Grid>

          {/* Approval Rate */}
          <Grid size={{ xs: 4 }}>
            <StatCard
              title="Approval Rate(%)"
              left={champion.approvePercent.toFixed(2)}
              right={challenger.approvePercent.toFixed(2)}
              delta={challenger.approveDifference.toFixed(2)}
              goodIsUp={true}
            />
          </Grid>

          {/* Approved Loan Amount */}
          <Grid size={{ xs: 4 }}>
            <StatCard
              title="Approved Loan Amount ($)"
              left={champion.approvedLoanAmount.toFixed(0)}
              right={challenger.approvedLoanAmount.toFixed(0)}
              delta={challenger.loanAmountDifference.toFixed(0)}
              goodIsUp={true}
            />
          </Grid>
              {/* Avg Time */}
          <Grid size={{ xs: 4 }}>
            <StatCard
              title="Avg TAT(ms)"
              left={champion.avgTime.toFixed(2)}
              right={challenger.avgTime.toFixed(2)}
              delta={challenger.avgTimeDifference.toFixed(2)}
              goodIsUp={false} // Lower is better for time 
            />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default MetricsDashboard;
