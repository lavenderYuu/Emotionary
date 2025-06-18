import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function MoodPieChart() {

    // const [dates, setDates] = useState([]);
    // const [moodData, setMoodData] = useState([]);
    const [moodCounts, setMoodCounts] = useState([]);

    const moods = ['😭', '☹️', '😐', '😊', '😀'];

    useEffect(() => {
        const fetchMonthlyEntries = async () => {
        try {
            const response = await fetch('http://localhost:3000/entries'); // TODO: filter by user?
            const entries = await response.json();

            console.log('entries: ', entries);

            const oneMonthAgo = new Date();
            oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

            console.log('oneWeekAgo: ', oneMonthAgo);

            const monthlyEntries = entries
            .filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= oneMonthAgo;
            });

            // count occurrences of each mood
            const counts = moods.map((mood) => ({
                id: mood,
                value: monthlyEntries.filter((entry) => entry.mood === mood).length,
                label: mood,
            }));

            setMoodCounts(counts);
        } catch (err) {
            console.error('Failed to fetch entries: ', err);
        }
        };

        fetchMonthlyEntries();
    }, []);

    return (
        <>
        <h2>Mood Over the Past Month</h2>
        <PieChart
            colors={['blue', 'purple', 'green', 'orange', 'yellow']}
            series={[
                {
                    data: moodCounts,
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