import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userObj: {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, action) {
      console.log("updating state");
      console.log(action);
      state.userObj = { ...action.payload };
    },
    logout(state, action) {
      state.userObj = {};
    },
  },
});

export const { loggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
