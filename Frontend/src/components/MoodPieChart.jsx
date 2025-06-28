import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import { moodToScore } from '../utils/helpers';

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
    const counts = Object.keys(moodToScore).map((mood) => ({
        id: mood,
        value: monthlyEntries.filter((entry) => entry.mood === mood).length,
        label: mood,
    }));

    return (
        <>
            {/* <h2>Mood Count Over the Past Month</h2> */}
            <PieChart
                colors={['#f02828', '#ec9b06', '#679fde', '#68c686', '#10a9a7']}
                series={[
                    {
                        data: counts,
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5
                    }
                ]}
                width={200}
                height={200}
            />
        </>
    );
}