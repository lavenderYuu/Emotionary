import { createSlice } from "@reduxjs/toolkit"
import { entries } from "../../assets/data/entries";

const getFavorites = () => {
    const favorites = [];
    for (const entry of entries) {
        if (entry.favorite === true) {
            favorites.push(entry);
        }
    }
    return favorites;
}

export const entriesSlice = createSlice({
    name: "entries",
    initialState: {
        entries: entries,
        activeEntry: null,
        favorites: getFavorites(),
    },

    reducers: {
        selectEntry(state, action) {
            const selectEntry = entries.find((e) => e.id === action.payload);
            state.activeEntry = selectEntry || null;
            console.log("active entry:", state.activeEntry)
        },

        resetEntry(state, action) {
            state.activeEntry = null;
            console.log("reset entry:", state.activeEntry)
        },

        doFavorite(state, action) {
            const entry = action.payload;
            const index = state.favorites.findIndex((e) => e.id === entry.id);

            if (index > -1) {
                state.favorites.splice(index, 1); // https://stackoverflow.com/questions/67436949/removing-a-value-from-an-array-using-redux-toolkit
            } else {
                state.favorites.push(entry);
            }
        },

        createEntry(state, action) {
            state.entries.push(action.payload);
        },
    },
})

export const { doFavorite, selectEntry, createEntry, resetEntry } = entriesSlice.actions;

export default entriesSlice.reducer;