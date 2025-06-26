import MoodChart from "../components/MoodChart";
import MoodCalendar from "../components/MoodCalendar";
import MoodPieChart from "../components/MoodPieChart";
import { Box, Grid } from "@mui/material";
import MoodHeatmap from "../components/MoodHeatmap";
import MoodGauge from "../components/MoodGauge";

const Insights = () => {
  

  return (
      <>
        <MoodChart />
        <h2>Your Mood this Month</h2>
        <Grid container spacing={20} justifyContent="center">
          <Grid>
            {/* <MoodCalendar /> */}
            <MoodGauge />
          </Grid>
          <Grid>
            <MoodPieChart />
          </Grid>
        </Grid>
        
        <MoodHeatmap />
      </>
  )
}

export default Insights;