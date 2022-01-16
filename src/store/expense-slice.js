import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  change: false,
};
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateExpenses(state, action) {
      state.expenses = [...action.payload];
    },
    addExpense(state, action) {
      const newExpense = action.payload;
      state.change = true;
      state.expenses.push(newExpense);
    },
    removeExpense(state, action) {
      const id = action.payload;
      state.change = true;
      // const existingExpense = state.expenses.find(expense => expense.id === id);
      state.expenses = state.expenses.filter((expense) => expense.id !== id);
    },
  },
});

export const { addExpense, removeExpense, updateExpenses } =
  expenseSlice.actions;
export default expenseSlice.reducer;
