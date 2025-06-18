import MoodChart from "../components/MoodChart";
import MoodCalendar from "../components/MoodCalendar";
import MoodPieChart from "../components/MoodPieChart";
import { Box, Grid } from "@mui/material";

const Insights = () => {
  

  return (
      <>
        <MoodChart />
        <Grid container spacing={10} justifyContent="center">
          <Grid item xs={12} md={8}>
            <MoodCalendar />
          </Grid>
          <Grid item xs={12} md={4}>
            <MoodPieChart />
          </Grid>
        </Grid>
      </>
  )
}

export default Insights;