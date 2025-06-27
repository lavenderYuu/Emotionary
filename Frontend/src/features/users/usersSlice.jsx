import { createSlice } from "@reduxjs/toolkit";

const storedUserId = localStorage.getItem("userId");

const initialState = {
  userId: storedUserId || null,
  isLoggedIn: !!storedUserId,
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
