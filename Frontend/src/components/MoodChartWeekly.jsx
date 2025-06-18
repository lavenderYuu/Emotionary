import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function MoodChartWeekly() {
    // const xLabelsWeek = [
    //     'May 24',
    //     'May 25',
    //     'May 26',
    //     'May 27',
    //     'May 28',
    //     'May 29',
    //     'May 30',
    // ];

    // const moodData = [2, 5, 4, 3, 3, 4, 4];

    // const dates = Array.from({ length: 7 }, (_, i) => new Date(2025, 4, i + 1));

    const [dates, setDates] = useState([]);
    const [moodData, setMoodData] = useState([]);

    const moodToScore = {
        '😭': 1,
        '☹️': 2,
        '😐': 3,
        '😊': 4, 
        '😀': 5  
    };

    useEffect(() => {
        const fetchWeeklyEntries = async () => {
        try {
            const response = await fetch('http://localhost:3000/entries'); // TODO: filter by user?
            const entries = await response.json();

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            console.log('oneWeekAgo: ', oneWeekAgo);

            const weeklyEntries = entries
            .filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= oneWeekAgo;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date));

            console.log('weeklyEntries: ', weeklyEntries);

            const chartDates = weeklyEntries.map(entry => new Date(entry.date));
            const moodScores = weeklyEntries.map(entry => moodToScore[entry.mood]);

            console.log('chartDates: ', chartDates);
            console.log('moodScores: ', moodScores);

            setDates(chartDates);
            setMoodData(moodScores);
        } catch (err) {
            console.error('Failed to fetch entries: ', err);
        }
        };

        console.log("Mood scores:", moodData);
        console.log("Dates:", dates);

        fetchWeeklyEntries();
    }, []);

    return (
        <>
            <LineChart
            xAxis={[{ scaleType: 'time',
                data: dates, 
                valueFormatter: (date) => new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date), }]}
            yAxis={[{ min: 1, max: 5}]}
            series={[
            {
                data: moodData,
                color: '#b8a7ff'
            },
            ]}
            height={300}
            width={1000}
            margin={{ top: 20, bottom: 60, left: 40, right: 20 }}
        />
        
        </>
        
    );
}