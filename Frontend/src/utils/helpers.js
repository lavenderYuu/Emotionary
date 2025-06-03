export const getDate = (date) => {
    const entryDate = new Date(date);
    return entryDate.toLocaleDateString('en-US');
};

export const getTags = (tags) => {
    return tags.reduce((acc, tag) => {
        acc[tag.id] = tag;
        return acc;
    }, {});
};