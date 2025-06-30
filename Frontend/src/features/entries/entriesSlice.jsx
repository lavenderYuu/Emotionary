import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEntries = createAsyncThunk('entries/fetchEntries', async (_, { getState }) => {
    const userId = getState().auth.userId;
    const res = await fetch(`http://localhost:3000/users/${userId}/entries`);
    return await res.json();
});

export const filterEntries = createAsyncThunk('entries/filterEntries', async (_, { getState }) => {
    const userId = getState().auth.userId;
    const { startDate, endDate, mood, favorite, page, limit } = getState().entries.filters;
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());
    if (mood) params.append('mood', mood);
    if (favorite) params.append('favorite', favorite);
    params.append('page', page);
    const res = await fetch(`http://localhost:3000/filter/${userId}?${params.toString()}`);
    const data = await res.json();
    return {
        entries: data.entries,
        totalEntries: data.totalEntries,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
    };
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
    filters: {
      startDate: null,
      endDate: null,
      mood: null,
      favorite: false,
      page: 1,
      limit: 8,
    },
    pagination: {
      totalEntries: 0,
      totalPages: 1,
      currentPage: 1,
    }
  },

  reducers: {
    selectEntry(state, action) {
      const selectEntry = state.entries.find((e) => e._id === action.payload);
      state.activeEntry = selectEntry || null;
    },
    resetEntry(state, action) {
      state.activeEntry = null;
      // console.log("reset entry:", state.activeEntry)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.entries = action.payload;

        if (state.activeEntry) {
          const update = action.payload.find(
            (entry) => entry._id === state.activeEntry._id
          );
          state.activeEntry = update;
        }
      })
        .addCase(filterEntries.fulfilled, (state, action) => {
        state.entries = action.payload.entries;
        state.pagination = {
            totalEntries: action.payload.totalEntries,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
          };
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
});

export const { selectEntry, resetEntry, createEntry } = entriesSlice.actions;

export default entriesSlice.reducer;