import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';
import { moodToScore, scoreToMood } from '../utils/helpers';
import { useTheme } from '@mui/material';

export default function MoodChartWeekly() {
    const entries = useSelector((state) => state.entries.entries);
    const theme = useTheme();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo.setHours(0,0,0,0);

    // console.log('oneWeekAgo: ', oneWeekAgo);

    const weeklyEntries = entries
        .filter(entry => {
            const entryDate = new Date(entry.date);
                return entryDate >= oneWeekAgo;
            })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // console.log('weeklyEntries: ', weeklyEntries);

    const dates = weeklyEntries.map(entry => new Date(entry.date));
    const moodData = weeklyEntries.map(entry => moodToScore[entry.mood]);

    // console.log('chartDates: ', dates);
    // console.log('moodScores: ', moodData);

    if (dates[0] !== oneWeekAgo) {
        dates.push(new Date(oneWeekAgo));
        moodData.push(null);
    }

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
                    color: theme.palette.secondary.main,
                    valueFormatter: (value) => scoreToMood[value],
                }]}
                height={320}
                margin={{ top: 40, bottom: 40, left: 30, right: 50 }}
            />
        </>
    );
}