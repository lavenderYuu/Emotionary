import { configureStore }  from "@reduxjs/toolkit";
import entries from '../features/entries/entriesSlice'
import tags from '../features/tags/tagsSlice'

export const store = configureStore({
    reducer: {
        entries: entries,
        tags: tags,
    }
})