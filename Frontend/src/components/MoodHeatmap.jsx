import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip'
import 'react-calendar-heatmap/dist/styles.css';
import { useSelector } from 'react-redux';
import { getDate, moodToScore, scoreToMood } from '../utils/helpers';
import { useState, useEffect } from 'react';

const MoodHeatmap = () => {
  const entries = useSelector((state) => state.entries.entries);
  const [isHorizontal, setIsHorizontal] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      console.log('window.innerWidth:', window.outerWidth);
      setIsHorizontal(window.outerWidth > 600);
      // setIsHorizontal(prev => {
      //   const shouldBeHorizontal = window.innerWidth > 600;
      //   return prev !== shouldBeHorizontal ? shouldBeHorizontal : prev;
      // });
      // const width = document.documentElement.clientWidth;
      // setIsHorizontal(width > 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moodData = entries.map(entry => ({
    date: entry.date,
    count: moodToScore[entry.mood] || 0,
  }));

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1); // TODO: actually should this start at january?

  return (
    <div className={isHorizontal ? 'heatmap-wrapper horizontal-heatmap' : 'heatmap-wrapper vertical-heatmap'} style={{ width: '100%', maxWidth: '1000px', margin: 'auto', }}>
      <h3>Mood Calendar</h3>
      <div className='heatmap-padding-wrapper'>
        <CalendarHeatmap
          key={isHorizontal ? 'horizontal' : 'vertical'}
          startDate={startDate}
          endDate={new Date()}
          values={moodData}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return `color-scale-${value.count}`; // use mood score to set colours
          }}
          tooltipDataAttrs={(value) => {
            const date = value?.date ? getDate(value.date) : null;
            const mood = value?.count ? scoreToMood[value.count] : null;

            return {
              'data-tooltip-id': 'tooltip',
              'data-tooltip-content': `${(!date || !mood) ? 'No entry' : (`Date: ${date}, Mood: ${mood}`)}`,
            };
          }}
          gutterSize={1}
          showWeekdayLabels={true}
          horizontal={isHorizontal}
        />
      </div>
      <Tooltip id="tooltip"/>
    </div>
    
  );
};

export default MoodHeatmap;
