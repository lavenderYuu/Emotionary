import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import MoodChartWeekly from './MoodChartWeekly';
import MoodChartMonthly from './MoodChartMonthly';
import WeeklyMonthlyButtonGroup from './buttons/WeeklyMonthlyButtonGroup';

export default function MoodChart() {
  const [view, setView] = useState('week');

  return ( // TODO: implement overlay (https://mui.com/x/react-charts/styling/) or "no data yet" localeText (https://mui.com/x/react-charts/localization/) for new app users 
    <div>
      <div
        style={{
          border: '1px solid rgb(226, 210, 190)',
          borderRadius: '15px',
          padding: '20px',
          margin: '60px 28px 7px 28px',
          backgroundColor: 'rgb(251, 246, 239)',
        }}
      >
        <h2>Mood Chart</h2>
        <WeeklyMonthlyButtonGroup selected={view} setSelected={setView}/>
        {view === 'weekly' ? <MoodChartWeekly /> : <MoodChartMonthly />}
      </div>
    </div>
  );
}