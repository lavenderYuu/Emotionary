import dayjs from "dayjs";

export const getDate = (date) => {
    return dayjs(date).format('MM/DD/YYYY'); // https://day.js.org/docs/en/display/format
};

export const getTags = (tags) => {
    return tags.reduce((acc, tag) => {
        acc[tag.id] = tag;
        return acc;
    }, {});
};