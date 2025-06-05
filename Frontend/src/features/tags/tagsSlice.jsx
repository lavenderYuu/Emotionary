import { createSlice } from "@reduxjs/toolkit"
import { tags } from "../../assets/data/tags";

export const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        tags: tags,
    },

    reducers: {
        setTags: (state, action) => {
            state.tags = action.payload;
        },
    },
})

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;