import { configureStore } from "@reduxjs/toolkit"; 
import expenseSlice from './expense-slice'


export default configureStore({
  reducer: { expense: expenseSlice}
});