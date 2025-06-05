import { configureStore }  from "@reduxjs/toolkit";
import favorites from '../features/favorites/favoritesSlice'

export const store = configureStore({
    reducer: {
        favorites: favorites,
    }
})