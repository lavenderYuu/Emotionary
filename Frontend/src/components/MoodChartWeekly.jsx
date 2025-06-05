import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart'

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

    const moodData = [2, 5, 4, 3, 3, 4, 4];

    const dates = Array.from({ length: 7 }, (_, i) => new Date(2025, 4, i + 1));

    return (
        <LineChart
            xAxis={[{ scaleType: 'time', data: dates }]} // TODO: how to always display date instead of time
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
    );
}