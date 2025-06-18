import { configureStore }  from "@reduxjs/toolkit";
import entries from '../features/entries/entriesSlice'
import tags from '../features/tags/tagsSlice'
import authReducer from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
    entries: entries,
    tags: tags,
    auth: authReducer,
  },
});