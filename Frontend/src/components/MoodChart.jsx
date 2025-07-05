import { useState } from 'react';
import MoodChartWeekly from './MoodChartWeekly';
import MoodChartMonthly from './MoodChartMonthly';
import WeeklyMonthlyButtonGroup from './buttons/WeeklyMonthlyButtonGroup';
import { useTheme } from '@mui/material/styles'

export default function MoodChart() {
  const [view, setView] = useState('week');
  const theme = useTheme();
  const backgroundColor = theme.palette.mode === 'light' ? '#fbf6ef' : '#1e1e1e';

  return ( // TODO: implement overlay (https://mui.com/x/react-charts/styling/) or "no data yet" localeText (https://mui.com/x/react-charts/localization/) for new app users 
    <div>
      <div
        style={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '15px',
          padding: '25px',
          margin: '20px 28px 20px 28px',
          backgroundColor: backgroundColor,
        }}
      >
        <h2>Mood Chart</h2>
        <WeeklyMonthlyButtonGroup selected={view} setSelected={setView}/>
        {view === 'weekly' ? <MoodChartWeekly /> : <MoodChartMonthly />}
      </div>
    </div>
  );
}