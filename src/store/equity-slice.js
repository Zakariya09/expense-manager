import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  equities: [],
  isEquityUpdate: false,
};
const equitySlice = createSlice({
  name: "equity",
  initialState,
  reducers: {
    updateEquity(state, action) {
      state.equities = [...action.payload];
    },
    addEquity(state, action) {
      const newEquity = action.payload;
      state.isEquityUpdate = true;
      state.equities.push(newEquity);
    },
    removeEquity(state, action) {
      const id = action.payload;
      state.isEquityUpdate = true;
      // const existingEquity = state.equities.find(equity => equity.id === id);
      state.equities = state.equities.filter((equity) => equity.id !== id);
    },
  },
});

export const { addEquity, removeEquity, updateEquity } =
  equitySlice.actions;
export default equitySlice.reducer;
