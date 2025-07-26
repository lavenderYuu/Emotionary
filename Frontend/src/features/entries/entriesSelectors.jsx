import { createSelector } from "@reduxjs/toolkit";

// https://react-redux.js.org/api/hooks
export const selectSortedEntries = createSelector (
    (state) => state.entries.entries,
    (entries) => {
        return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date)); //https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    }
);