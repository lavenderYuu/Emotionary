import { BarChart } from '@mui/x-charts/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { emojiSentimentMap, moodColors } from '../utils/helpers';
import { selectSortedTags } from '../features/tags/tagsSelectors';
import { fetchTags } from '../features/tags/tagsSlice';
import { useEffect } from 'react';

export default function MoodTagChart() {
    const entries = useSelector((state) => state.entries.entries);
    const moods = [...Object.keys(emojiSentimentMap)].reverse();
    const colors = [...moodColors].reverse();
    const tags = useSelector(selectSortedTags);
    const tagNames = tags.map(tag => tag.name);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);  
    const monthlyEntries = entries
        .filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= oneMonthAgo;
        });

    const tagMoodCounts = [];
    tags.forEach(tag => {
        const moodCounts = {
            '😭': 0,
            '☹️': 0,
            '😐': 0,
            '😊': 0, 
            '😀': 0,  
        };

        monthlyEntries.forEach(entry => {
            if (entry.tags.some(t => t._id === tag._id)) {
                moodCounts[entry.mood] += 1;
            }
        })

        tagMoodCounts.push({ tag, ...moodCounts });
    });

    const series = moods.map((mood, index) => ({
        label: mood + " " + emojiSentimentMap[mood],
        data: tagMoodCounts.map(tag => tag[mood]),
        stack: 'moods',
        color: colors[index],
    }));

    if (entries.length === 0 || tags.length === 0) {
        return <div>No data to display</div>;
    }

    return (
        <>
            <h3>Mood Frequency By Tag</h3>
            <BarChart
                sx={{ 
                    "& .MuiChartsAxis-tickLabel tspan": { fontSize: 15 },
                    "& .MuiChartsLegend-label": { fontSize: 15 },
                    "& .MuiChartsLegend-root": { gap: 4 },
                }}
                xAxis={[{
                    data: tagNames,
                    label: "Tags",
                }]}
                yAxis={[{ 
                    min: 0,
                    label: "Frequency",
                }]}
                series={series}
                borderRadius={8}
                height={320}
                margin={{ top: 40, bottom: 20, left: 30, right: 50 }}
            />
        </>
    );
}