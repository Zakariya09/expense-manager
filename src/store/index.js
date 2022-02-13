import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expense-slice";
import authSlice from "./auth-slice";
import salarySlice from "./salary-slice";
import journalSlice from "./journal-slice";
import equitySlice from "./equity-slice";

export default configureStore({
  reducer: { expense: expenseSlice, 
  auth: authSlice, 
  salary: salarySlice,
  journal: journalSlice,
  equity: equitySlice,
  },
});
