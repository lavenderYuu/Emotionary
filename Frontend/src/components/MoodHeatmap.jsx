import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip'
import 'react-calendar-heatmap/dist/styles.css';
import { useSelector } from 'react-redux';
import { getDate, moodToScore, scoreToMood } from '../utils/helpers';

const MoodHeatmap = () => {
  const entries = useSelector((state) => state.entries.entries);

  const moodData = entries.map(entry => ({
    date: entry.date,
    count: moodToScore[entry.mood] || 0,
  }));

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
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) return null;

          const date = getDate(value.date);
          const mood = scoreToMood[value.count];

          return {
            'data-tooltip-id': 'tooltip',
            'data-tooltip-content': `Date: ${date}, Mood: ${mood}`,
          };
        }}
        showWeekdayLabels={true}
        horizontal={true}
      />
      <Tooltip id="tooltip"/>
    </div>
    
  );
};

export default MoodHeatmap;
