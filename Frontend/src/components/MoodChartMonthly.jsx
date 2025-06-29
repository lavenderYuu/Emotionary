import { LineChart } from '@mui/x-charts/LineChart'
import { useSelector } from 'react-redux';
import { moodToScore, scoreToMood } from '../utils/helpers';
import { Box } from '@mui/material';

export default function MoodChartMonthly() {
    const entries = useSelector((state) => state.entries.entries);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const monthlyEntries = entries
    .filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneMonthAgo;
    });

    const dates = monthlyEntries.map(entry => new Date(entry.date));
    const moodData = monthlyEntries.map(entry => moodToScore[entry.mood]);

    // console.log('chartDates: ', dates);
    // console.log('moodScores: ', moodData);

    return (
        <>
            <LineChart
                sx={{ "& .MuiChartsAxis-tickLabel tspan": { fontSize: 15 } }}
                xAxis={[{ 
                    scaleType: 'time', 
                    data: dates,
                    valueFormatter: (date) => new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date), 
                    tickNumber: 7,
                }]}
                yAxis={[{ 
                    min: 1, 
                    max: 5,
                    tickNumber: 5, 
                    valueFormatter: (value) => scoreToMood[value],
                }]}
                series={[{
                    data: moodData,
                    color: '#b8a7ff',
                    valueFormatter: (value) => scoreToMood[value],
                }]}
                height={320}
                margin={{ top: 40, bottom: 40, left: 30, right: 50 }}
            />
        </>
    );
}