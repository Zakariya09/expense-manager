import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  equities: [],
  selectedEquity: {},
  action: '',
  isUpdate: false,
  change: false,
  isLoading: false,
  fetchError: false,
};
const equitySlice = createSlice({
  name: "equity",
  initialState,
  reducers: {
    getEquity(state, action) {
      state.change = false;
      state.selectedEquity = {},
        state.action = '',
        state.equities = [...action.payload];
    },
    addEquity(state, action) {
      const newEquity = action.payload.obj;
      state.change = true;
      state.isLoading = true;
      state.selectedEquity = newEquity;
      state.action = 'save';
      state.isUpdate = action.payload.isUpdate
    },
    removeEquity(state, action) {
      const id = action.payload;
      state.change = true;
      state.isLoading = true;
      state.action = 'delete',
      state.selectedEquity = { id };
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

export const { addEquity, removeEquity, getEquity, hideLoader, showAlert, hideAlert, resetState } =
  equitySlice.actions;
export default equitySlice.reducer;
