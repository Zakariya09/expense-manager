import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salaries: [],
  isSalaryUpdate: false,
};
const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    updateSalary(state, action) {
      state.salaries = [...action.payload];
    },
    addSalary(state, action) {
      const newSalary = action.payload;
      state.isSalaryUpdate = true;
      state.salaries.push(newSalary);
    },
    removeSalary(state, action) {
      const id = action.payload;
      state.isSalaryUpdate = true;
      // const existingSalary = state.salaries.find(salary => salary.id === id);
      state.salaries = state.salaries.filter((salary) => salary.id !== id);
    },
  },
});

export const { addSalary, removeSalary, updateSalary} =
  salarySlice.actions;
export default salarySlice.reducer;
