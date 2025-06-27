import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

export const getDate = (date) => {
    return dayjs(date).format('lll'); // https://day.js.org/docs/en/display/format
};

export const getTags = (tags) => {
    return tags.reduce((acc, tag) => {
        acc[tag.id] = tag;
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