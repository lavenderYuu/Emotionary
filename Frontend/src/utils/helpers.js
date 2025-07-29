import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

export const getDate = (date) => {
    return dayjs(date).format('lll'); // https://day.js.org/docs/en/display/format
};

export const getTags = (tags) => {
    return tags.reduce((acc, tag) => {
        acc[tag._id] = tag;
        return acc;
    }, {});
};

// scores are negative to positive
export const moodToScore = {
    '😭': 1,
    '☹️': 2,
    '😐': 3,
    '😊': 4, 
    '😀': 5  
};

export const scoreToMood = {
    1: '😭',
    2: '☹️',
    3: '😐',
    4: '😊',
    5: '😀',
};

// descriptions are positive to negative
export const sentimentEmojiMap = {
    'Very Positive': '😀',
    'Positive': '😊',
    'Neutral': '😐',
    'Negative': '☹️',
    'Very Negative': '😭',
};

export const emojiSentimentMap = {
    '😀': 'Very Positive',
    '😊': 'Positive',
    '😐': 'Neutral',
    '☹️': 'Negative',
    '😭': 'Very Negative',
};

// colors are positive to negative
export const moodColors = ['#10a9a7', '#68c686', '#679fde', '#ec9b06', '#f02828'];

export const tagColours = [
  "#d0b69f",
  "#b8a7ff",
  "#7dda92",
  "#c8bff7",
  "#a2c3f3",
  "#6292da",
  "#f9c1ad",
  "#b5c07a",
  "#f2aa3e",
  "#d5a6bd",
];

export const sensitiveKeywords = [
    "suicide",
    "kill myself",
    "hurt myself",
    "want to die",
    "self harm",
    "self-harm"
];