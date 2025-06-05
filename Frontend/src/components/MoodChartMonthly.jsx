import { LineChart } from '@mui/x-charts/LineChart'

export default function MoodChartMonthly() {

    // const xLabelsMonth = [
    //     'May 1', 'May 2', 'May 3', 'May 4', 'May 5', 'May 6', 'May 7',
    //     'May 8', 'May 9', 'May 10', 'May 11', 'May 12', 'May 13', 'May 14',
    //     'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20', 'May 21',
    //     'May 22', 'May 23', 'May 24', 'May 25', 'May 26', 'May 27', 'May 28',
    //     'May 29', 'May 30', 'May 31'
    // ];

    const moodData = [
                    3, 2, 4, 3, 5, 2, 1,
                    2, 3, 4, 3, 5, 4, 2, 
                    3, 3, 4, 2, 3, 5, 4,  
                    3, 2, 4, 5, 4, 3, 2,   
                    4, 3, 5
                ];

    const dates = Array.from({ length: 31 }, (_, i) => new Date(2025, 4, i + 1));

    return (
        <LineChart
            xAxis={[{ scaleType: 'time', data: dates }]}
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