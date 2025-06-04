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
        nextId: entries.length + 1
    },

    reducers: {
        selectEntry(state, action) {
            const selectEntry = state.entries.find((e) => e.id === action.payload);
            state.activeEntry = selectEntry || null;
            console.log("selected entry:", state.activeEntry.id)
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
            // console.log("create entry:", action.payload);
            state.entries.push(action.payload);
            state.nextId += 1;
        },

        deleteEntry(state, action) {
            const entry = action.payload;
            const index = state.entries.findIndex((e) => e.id === entry.id);
            if (index > -1) {
                state.entries.splice(index, 1);
            }
        },

        editEntry(state, action) {
            const entry = action.payload;
            const index = state.entries.findIndex((e) => e.id === entry.id);
            state.entries[index] = entry;
        },
    },
})

export const { selectEntry, resetEntry, doFavorite, createEntry, deleteEntry, editEntry} = entriesSlice.actions;

export default entriesSlice.reducer;