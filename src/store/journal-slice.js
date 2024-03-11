import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  journals: [],
  selectedJournal: {},
  action: '',
  isUpdate: false,
  change: false,
  isLoading: false,
  fetchError: false,
};
const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    getJournal(state, action) {
      state.change = false;
      state.selectedJournal = {},
        state.action = '',
        state.journals = [...action.payload];
    },
    addJournal(state, action) {
      const newJournal = action.payload.obj;
      state.change = true;
      state.isLoading = true;
      state.selectedJournal = newJournal;
      state.action = 'save';
      state.isUpdate = action.payload.isUpdate
    },
    removeJournal(state, action) {
      const id = action.payload;
      state.change = true;
      state.isLoading = true;
      state.action = 'delete',
        state.selectedJournal = { id };
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

export const { addJournal, removeJournal, getJournal, hideLoader, showAlert, hideAlert, resetState } =
  journalSlice.actions;
export default journalSlice.reducer;
