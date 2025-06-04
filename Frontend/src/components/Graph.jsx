import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import WeeklyGraph from './WeeklyGraph';
import MonthlyGraph from './MonthlyGraph';

export default function Graph() {
  const [view, setView] = useState('week');

  const handleChange = (_, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        color="primary"
        sx={{ mb: 2 }}
        aria-label="label"
      >
        <ToggleButton value="week" aria-label="label">Weekly</ToggleButton>
        <ToggleButton value="month" aria-label="label">Monthly</ToggleButton>
      </ToggleButtonGroup>

      {view === 'week' && <WeeklyGraph />}
      {view === 'month' && <MonthlyGraph />}
    </div>
  );
}