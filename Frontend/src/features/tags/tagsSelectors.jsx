import { createSelector } from "@reduxjs/toolkit";

export const selectTagItems = (state) => state.tags.items;

export const selectSortedTags = createSelector(
  [selectTagItems],
  (tags) => [...tags].sort((a, b) => a.name.localeCompare(b.name))
);
