import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  selectedExpense: {},
  action: '',
  isUpdate: false,
  change: false,
  isLoading: false,
  fetchError: false,
};
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getExpense(state, action) {
      state.change = false;
      state.selectedExpense = {},
        state.action = '',
        state.expenses = [...action.payload];
    },
    addExpense(state, action) {
      const newExpense = action.payload.obj;
      state.change = true;
      state.isLoading = true;
      state.selectedExpense = newExpense;
      state.action = 'save';
      state.isUpdate = action.payload.isUpdate
    },
    removeExpense(state, action) {
      const id = action.payload;
      state.change = true;
      state.isLoading = true;
      state.action = 'delete',
      state.selectedExpense = { id };
    },
    hideLoader(state, action) {
      state.isLoading = false;
    },
    showAlert(state, action) {
      state.showError = true;
    },
    hideAlert(state) {
      state.showError = false;
    },
    resetState(state) {
      state.action = '';
      state.isUpdate = false;
      state.change = false;
      state.isLoading = false;
      state.fetchError = false;
    }
  },
});

export const { addExpense, removeExpense, getExpense, hideLoader, showAlert, hideAlert, resetState } =
  expenseSlice.actions;
export default expenseSlice.reducer;
