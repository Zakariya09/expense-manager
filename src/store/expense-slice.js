import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  change: false,
};
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateExpenses (state, action){
      console.log("updating state");
      console.log(action);

      state.expenses = [...action.payload]
      console.log("expenses after update state");
      console.log(state.expenses);
    },
    addExpense(state, action) {
      const newExpense = action.payload;
      state.change = true;
      state.expenses.push(newExpense);
      console.log("after fetch state.expenses")
      console.log( state.expenses)
    },
    removeExpense(state, action) {
      const id = action.payload;
      state.change = true;
      // const existingExpense = state.expenses.find(expense => expense.id === id);
      state.expenses = state.expenses.filter((expense) => expense.id !== id);
    },
  },
});

export const { addExpense, removeExpense, updateExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
