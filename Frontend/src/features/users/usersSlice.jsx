import { createSlice } from "@reduxjs/toolkit";

const storedUserId = localStorage.getItem("userId");
const storedUserName = localStorage.getItem("userName");

const initialState = {
  userId: storedUserId || null,
  userName: storedUserName || null,
  isLoggedIn: !!storedUserId,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.isLoggedIn = true;
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('userName', action.payload.userName);
    },
    clearUserId: (state) => {
      state.userId = null;
      state.userName = null;
      state.isLoggedIn = false;
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    },
  },
});

export const { setUserId, clearUserId } = authSlice.actions;
export default authSlice.reducer;
