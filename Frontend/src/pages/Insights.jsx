import MoodChart from "../components/MoodChart";
import MoodCalendar from "../components/MoodCalendar";
import MoodPieChart from "../components/MoodPieChart";
import { Box } from "@mui/material";
import MoodHeatmap from "../components/MoodHeatmap";
import MoodGauge from "../components/MoodGauge";
import { useEffect } from "react";

const Insights = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <>
        <h1>Mood Insights</h1>
        <MoodChart />
        <h2>Your Mood This Month</h2>
        <Box sx={{ m: 4, display: 'flex', gap: 8, alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap' }} >
          <Box>
            {/* <MoodCalendar /> */}
            <MoodGauge />
          </Box>
          <Box>
            <MoodPieChart />
          </Box>
        </Box>
        <MoodHeatmap />
      </>
  )
}

export default Insights;