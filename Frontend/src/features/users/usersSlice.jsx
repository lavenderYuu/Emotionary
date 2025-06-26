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
      localStorage.setItem('userId', action.payload);
    },
    clearUserId: (state) => {
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem('userId');
    },
  },
});

export const { setUserId, clearUserId } = authSlice.actions;
export default authSlice.reducer;
