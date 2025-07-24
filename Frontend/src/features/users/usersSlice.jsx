import { createSlice } from "@reduxjs/toolkit";

const storedUserId = localStorage.getItem("userId");
const storedUserName = localStorage.getItem("userName");
const storedUserEmail = localStorage.getItem("userEmail");

const initialState = {
  userId: storedUserId || null,
  userName: storedUserName || null,
  userEmail: storedUserEmail || null,
  isLoggedIn: !!storedUserId,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.isLoggedIn = true;
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('userEmail', action.payload.userEmail);
    },
    clearUserId: (state) => {
      state.userId = null;
      state.userName = null;
      state.userEmail = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setUserId, clearUserId } = authSlice.actions;
export default authSlice.reducer;
