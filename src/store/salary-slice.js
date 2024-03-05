import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salaries: [],
  selectedSalary: {},
  action: '',
  isUpdate: false,
  change: false,
  isLoading: false,
  fetchError: false,
};
const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    getSalary(state, action) {
      state.change = false;
      state.selectedSalary = {},
        state.action = '',
        state.salaries = [...action.payload];
    },
    addSalary(state, action) {
      const newSalary = action.payload.obj;
      state.change = true;
      state.isLoading = true;
      state.selectedSalary = newSalary;
      state.action = 'save';
      state.isUpdate = action.payload.isUpdate
    },
    removeSalary(state, action) {
      const id = action.payload;
      state.change = true;
      state.isLoading = true;
      state.action = 'delete',
      state.selectedSalary = { id };
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

export const {getSalary,  addSalary, removeSalary, updateSalary, hideLoader, hideAlert, showAlert, resetState } =
  salarySlice.actions;
export default salarySlice.reducer;
