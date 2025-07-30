import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import RefreshIcon from '@mui/icons-material/Refresh';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export default function DailyPrompt({ onCreateFromPrompt }) {
    const entries = useSelector((state) => state.entries.entries);
    const theme = useTheme();
    const backgroundColor = theme.palette.mode === 'light' ? '#fbf6ef' : '#1e1e1e';

    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [usingGeneralPrompt, setUsingGeneralPrompt] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

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

    const moodPrompts = {
        "😭": [
        "You mentioned feeling really down recently. How are you feeling today? ❤️",
        "Things have seemed really tough lately. What's been weighing on you? ❤️"
        ],
        "☹️": [
        "It sounds like things have been a bit difficult lately. What's something that helped you get through yesterday? ⛅",
        "It sounded like you had a hard day recently. What's on your mind today? 💗"
        ],
        "😐": [
        "What do you want to reflect on today? 💭",
        "What's been on your mind lately? 💭"
        ],
        "😊": [
        "Seems like things are going well for you lately. What's been bringing you joy? 😊",
        "Sounds like things have been going pretty well! What do you want to carry into today? 😊"
        ],
        "😀": [
        "It sounds like things have been going really well recently. How can you carry that positive energy into today? ☀️",
        "Seems like you've been doing really well lately. What's been bringing you joy? ☀️"
        ],
    };

    const generalPrompts = [
        "What are you grateful for today? 🙏",
        "What aspect of your life are you most grateful for? 🌟",
        "What's something that made you smile recently? 😊",
        "Is there anything you're avoiding that you want to face? 💪",
        "Describe a small win from this week. 🏆",
        "How are you showing up for yourself today? 💪",
        "What's one thing you're looking forward to? 🎉",
        "If today had a title, what would it be? 📖",
        "If you had a magic wand to solve any one problem what would it be and how would your life change? ✨",
        "What are three things you are looking forward to doing this week? Why? 📅",
        "Describe your favorite thing to do when feeling low. 🌅",
        "Write about something that you would like to let go of. 🕊️",
        "What is a view about the world that has changed for you as you’ve gotten older? 🌍",
        "Who is the most difficult person in your life and why? 😠",
        "Write about a mistake that taught you something about yourself. 💡",
        "Write about an aspect of your personality that you appreciate in other people as well. 🧑‍🤝‍🧑",
        "What is a positive habit that you would really like to cultivate? Why and how could you get started? 🌱",
        "What is a question that you are really scared to know the answer to? 😨",
        "What do you need to give yourself more credit for? 👏",
        "What could you do to make your life more meaningful? 🌻",
        "What are some small things that other people have done that really make your day? 🌞",
        "Take a task that you've been dreading and break it up into the smallest possible steps. 🧩",
        "How do the opinions of others affect you? 📢",
        "What do you appreciate most about your personality? What aspects do you find harder to accept? ❤️‍🩹",
        "Finish this sentence: “My life would be incomplete without …” ❤️",
        "What three things would you most like others to know about you? 💬",
        "Describe a choice you regret. What did you learn from it? 🧠",
        "What are three things that can instantly disrupt a good mood and bring you down? What strategies do you use to counter these effects? 🩹",
        "What parts of daily life cause stress, frustration, or sadness? What can you do to change those experiences? 🌧️",
        "What do you fear most? Have your fears changed throughout life? 👻",
        "What three ordinary things bring you the most joy? ☀️"
    ];

    useEffect(() => {
        if (currentPrompt) {
            localStorage.setItem('currentPrompt', currentPrompt);
            localStorage.setItem('usingGeneralPrompt', usingGeneralPrompt.toString());
        }
    }, [currentPrompt, usingGeneralPrompt]);

    useEffect(() => {
        const savedPrompt = localStorage.getItem('currentPrompt');
        const savedUsingGeneral = localStorage.getItem('usingGeneralPrompt') === 'true';

        if (savedPrompt) {
            setCurrentPrompt(savedPrompt);
            setUsingGeneralPrompt(savedUsingGeneral);
        } else if (entries.length>0 && !currentPrompt && !usingGeneralPrompt) { // only run if entries are loaded, prompt isn't set yet, and we're not using general prompt; this ensures prompt is displayed without having to click refresh button
            if (recentMood && moodPrompts[recentMood]) {
                const options = moodPrompts[recentMood];
                const randomPrompt = options[Math.floor(Math.random() * options.length)];
                setCurrentPrompt(randomPrompt);
            } else {
                setCurrentPrompt("How are you feeling today?"); // generic prompt if mood is missing or invalid
            }
        } 
        
    }, [entries, currentPrompt, usingGeneralPrompt, recentMood]);

    const handleRefresh = () => {
        const randomGeneral = generalPrompts[Math.floor(Math.random() * generalPrompts.length)];
        setCurrentPrompt(randomGeneral);
        setUsingGeneralPrompt(true);
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 600);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: '15px',
                    padding: '25px',
                    margin: '20px 28px 20px 28px',
                    backgroundColor: backgroundColor,
                    width: '100%',
                    maxWidth: '600px',
                    minWidth: '300px',
                    boxSizing: 'border-box'
                }}
            >
                <h2>Daily Prompt</h2>
                <p>{currentPrompt}</p>
                <div>
                    <RefreshIcon onClick={handleRefresh} sx={{mr: 1.5, mt: 0.8, cursor: 'pointer', transition: 'transform 0.6s', transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)' }}/>
                    <CreateOutlinedIcon onClick={() => onCreateFromPrompt(currentPrompt)} sx={{ ml: 1.5, mt: 0.8, cursor: 'pointer' }} />
                </div>
            </div>
            
        </div>
    );
}