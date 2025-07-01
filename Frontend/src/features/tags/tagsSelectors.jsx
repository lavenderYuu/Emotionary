import { createSelector } from "@reduxjs/toolkit";

// https://react-redux.js.org/api/hooks
// export const selectSortedTags = createSelector (
//     (state) => state.tags.tags,
//     (tags) => {
//         return [...tags].sort((a, b) => a.id.localeCompare(b.id));
//     }
// );

// export const selectSortedTags = (state) => {
//   return [...state.tags.items].sort((a, b) => a.name.localeCompare(b.name));
// };

export const selectTagItems = (state) => state.tags.items;

export const selectSortedTags = createSelector(
  [selectTagItems],
  (tags) => [...tags].sort((a, b) => a.name.localeCompare(b.name))
);
