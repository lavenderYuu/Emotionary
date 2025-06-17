import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEntries = createAsyncThunk('entries/fetchEntries', async () => {
    const res = await fetch('http://localhost:3000/entries');
    return await res.json();
});

export const favoriteEntry = createAsyncThunk('entries/favoriteEntry', async (entry) => {
    const update = entry.favorite === true ? false : true;
    const res = await fetch(`http://localhost:3000/entries/${entry._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favorite: update }),
          });
    return await res.json();
});

export const deleteEntry = createAsyncThunk('entries/deleteEntry', async (entry) => {
    const res = await fetch(`http://localhost:3000/entries/${entry._id}`, { method: 'DELETE' });
    return await res.json();
});


export const entriesSlice = createSlice({
    name: "entries",
    initialState: {
        entries: [],
        activeEntry: null,
    },

    reducers: {
        selectEntry(state, action) {
            const selectEntry = state.entries.find((e) => e._id === action.payload);
            state.activeEntry = selectEntry || null;
        },
        resetEntry(state, action) {
            state.activeEntry = null;
            console.log("reset entry:", state.activeEntry)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntries.fulfilled, (state, action) => {
                state.entries = action.payload;
            })
            .addCase(favoriteEntry.fulfilled, (state, action) => {
                const entry = action.payload;
                const index = state.entries.findIndex((e) => e._id === entry._id);

                if (index !== -1) {
                    state.entries[index] = entry;
                }
            })
            .addCase(deleteEntry.fulfilled, (state, action) => {
                const entry = action.payload;
                const index = state.entries.findIndex((e) => e._id === entry._id);
                if (index !== -1) {
                    state.entries.splice(index, 1);
                }
            });
    },
})

export const { selectEntry, resetEntry, createEntry } = entriesSlice.actions;

export default entriesSlice.reducer;