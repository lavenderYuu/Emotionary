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

export const sentimentEmojiMap = {
    'Very Positive': '😀',
    'Positive': '😊',
    'Neutral': '😐',
    'Negative': '☹️',
    'Very Negative': '😭',
};

export const tagColours = [
  "#e992d5", 
  "#b8a7ff", 
  "#7dda92", 
  "#c8bff7", 
  "#ffe599",
  "#5eaeff", 
  "#ffbde9", 
  "#04c589", 
  "#f2aa3e", 
  "#d5a6bd"
];