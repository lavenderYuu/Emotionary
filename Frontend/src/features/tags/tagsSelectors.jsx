import { createSelector } from "@reduxjs/toolkit";

// https://react-redux.js.org/api/hooks
export const selectSortedTags = createSelector (
    (state) => state.tags.tags,
    (tags) => {
        return [...tags].sort((a, b) => a.id.localeCompare(b.id));
    }
);