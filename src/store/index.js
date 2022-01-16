import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expense-slice";
import authSlice from "./auth-slice";

export default configureStore({
  reducer: { expense: expenseSlice, auth: authSlice },
});
