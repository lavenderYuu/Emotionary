import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import { emojiSentimentMap, moodColors } from '../utils/helpers';

export default function MoodPieChart() {
    const entries = useSelector((state) => state.entries.entries);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);  

    // console.log('oneWeekAgo: ', oneMonthAgo);

    const monthlyEntries = entries
        .filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= oneMonthAgo;
        });

    // count occurrences of each mood
    const counts = Object.keys(emojiSentimentMap).map((mood) => ({
        id: mood,
        value: monthlyEntries.filter((entry) => entry.mood === mood).length,
        label: mood + " " + emojiSentimentMap[mood],
    }));

    if (entries.length === 0) {
        return <div>No data to display</div>;
    }

    return (
        <>
            {/* <h2>Mood Count Over the Past Month</h2> */}
            <PieChart
                sx={{ "& .MuiChartsLegend-label": { fontSize: 16 } }}
                colors={moodColors}
                series={[
                    {
                        data: counts,
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5
                    }
                ]}
                width={250}
                height={200}
            />
        </>
    );
}