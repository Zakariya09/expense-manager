import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holdings: [],
  change: false,
};
const holdingSlice = createSlice({
  name: "holding",
  initialState,
  reducers: {
    updateHolding(state, action) {
      state.holdings = [...action.payload];
    },
    addHolding(state, action) {
      const newholding = action.payload;
      state.change = true;
      state.holdings.push(newholding);
    },
    removeHolding(state, action) {
      const id = action.payload;
      state.change = true;
      // const existingholding = state.holdings.find(holding => holding.id === id);
      state.holdings = state.holdings.filter((holding) => holding.id !== id);
    },
  },
});

export const { addHolding, removeHolding, updateHolding } =
  holdingSlice.actions;
export default holdingSlice.reducer;
