import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MonthlyMoodGauge = () => {
    const entries = useSelector((state) => state.entries.entries);

    const emojiToScore = {
        '😭': 1,
        '☹️': 2,
        '😐': 3,
        '😊': 4,
        '😀': 5,
    };

    const scoreToEmoji = {
        1: '😭',
        2: '☹️',
        3: '😐',
        4: '😊',
        5: '😀',
    };

    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(today.getDate() - 30);

    const recentEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= oneMonthAgo && entryDate <= today;
    });

    const scores = recentEntries.map(entry => emojiToScore[entry.mood]);
    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const averageMood = parseFloat(avg.toFixed(2)); // 2 decimal places

    if (averageMood === null) {
        return <div>Loading...</div>;
    }

    const roundedMood = Math.round(averageMood);
    const moodEmoji = scoreToEmoji[roundedMood];

    const percent = ((averageMood - 1) / 4) * 100;

    return (
        <div style={{ textAlign: 'center', maxWidth: '300px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem' }}>{moodEmoji}</div>
            <div style={{ fontSize: '1.5rem', color: '#555' }}>
                Average Mood: {averageMood}
            </div>
            <div style={{
                marginTop: '1rem',
                height: '20px',
                width: '100%',
                backgroundColor: '#eee',
                borderRadius: '10px',
                overflow: 'hidden',
            }}>
                <div
                style={{
                    height: '100%',
                    width: `${percent}%`,
                    backgroundColor: getColorByMoodScore(roundedMood),
                }}
                />
            </div>
        </div>
    );
};

function getColorByMoodScore(score) {
  switch (score) {
    case 1: return '#f02828';
    case 2: return '#ec9b06'; 
    case 3: return '#679fde';
    case 4: return '#68c686';
    case 5: return '#10a9a7';
  }
}

export default MonthlyMoodGauge;
