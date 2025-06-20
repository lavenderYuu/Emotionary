import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
// import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

const MoodHeatmap = () => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const response = await fetch('http://localhost:3000/entries');
        const entries = await response.json();

        const mapped = entries.map(entry => ({
          date: entry.date,
          count: moodToScore[entry.mood] || 0,
        }));

        setMoodData(mapped);
      } catch (err) {
        console.error('failed to fetch mood entries:', err);
      }
    };

    fetchMoodEntries();
  }, []);

  const moodToScore = {
    '😭': 1,
    '☹️': 2,
    '😐': 3,
    '😊': 4,
    '😀': 5,
  };

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1); // TODO: actually should this start at january?

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto', }}>
      <h2>Mood Calendar</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={new Date()}
        values={moodData}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          return `color-scale-${value.count}`; // use mood score to set colours
        }}
        tooltipDataAttrs={(value) => { // TODO: tooltip
          if (!value || !value.date) return null;
          return {
            'data-tip': `Date: ${value.date}, Mood Score: ${value.count}`,
          };
        }}
        showWeekdayLabels={true}
        horizontal={true}
      />
      {/* <ReactTooltip /> */}
      
    </div>
    
  );
};

export default MoodHeatmap;
