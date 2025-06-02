import { createSlice } from "@reduxjs/toolkit"
import { entries } from "../../assets/data/entries";

const getFavoritesFromStorage = () => {
    const favorites = [];
    for (let entry of entries) {
        if (entry.favorite === true) {
            favorites.push(entry);
        }
    }
    return favorites;
}

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: getFavoritesFromStorage(),

    reducers: {
        doFavorite(state, action) {
            const entry = action.payload;
            const index = state.findIndex((e) => e.id === entry.id);

            if (index > -1) {
                state.splice(index, 1); // https://stackoverflow.com/questions/67436949/removing-a-value-from-an-array-using-redux-toolkit
            } else {
                state.push(action.payload);
            }
        },
    },
})

export const { doFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;