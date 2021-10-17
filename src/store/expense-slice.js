import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  changed: false,
  reducers: {
    addExpense(state, action) {
      console.log("add expense call");

      const newExpense = action.payload;
      console.log("newExpense");
      console.log(newExpense);
      const existingExpense = state.expenses.find(
        (expense) => expense.id === newExpense.id
      );
      if (!existingExpense) {
        state.expenses.push(newExpense);
      }
    },
    removeExpense(state, action) {
      const id = action.payload;
      // const existingExpense = state.expenses.find(expense => expense.id === id);
      state.expenses = state.expenses.filter((expense) => expense.id !== id);
    },
  },
});
export const {addExpense, removeExpense} = expenseSlice.actions;
export default expenseSlice.reducer;
