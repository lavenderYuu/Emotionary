import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.isLoggedIn = true;
    },
    clearUserId: (state) => {
      state.userId = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUserId, clearUserId } = authSlice.actions;
export default authSlice.reducer;
