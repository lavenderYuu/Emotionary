import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import RefreshIcon from '@mui/icons-material/Refresh';
import CreateButton from './buttons/CreateButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export default function DailyPrompt() {
    const entries = useSelector((state) => state.entries.entries);
    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'light' ? '#fbf6ef' : '#1e1e1e';

    const recentEntry = useMemo(() => {
        const today = dayjs().startOf('day');

        return [...entries]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .find(entry => {
                const entryDate = dayjs(entry.date).startOf('day');
                return !entryDate.isSame(today); // return most recent entry BEFORE today
            });
    }, [entries]);

    const recentMood = recentEntry?.mood;

    const getPromptForMood = (score) => {
        switch (score) {
        case "😭":
            return "You mentioned feeling really down recently. Want to talk more about it today?";
        case "☹️":
            return "It sounded like you had a hard day recently. What’s on your mind today?";
        case "😐":
            return "What's on your mind today?";
        case "😊":
            return "You've seemed to be feeling good recently. What has been going well?";
        case "😀":
            return "You've seemed really upbeat lately! What's been bringing you joy?";
        default:
            return "How are you feeling today?";
        }
  };

    const prompt = getPromptForMood(recentMood);

    return (
        <div>
            <div
                style={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '15px',
                padding: '25px',
                margin: '20px 28px 20px 28px',
                backgroundColor: backgroundColor,
                }}
            >
                <h2>Daily Prompt</h2>
                <p>{prompt}</p>
                <div>
                    <RefreshIcon />
                    <CreateOutlinedIcon sx={{ mr: 1 }} />
                </div>
            </div>
            
        </div>
    );
}