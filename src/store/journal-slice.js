import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  journals: [],
  isJournalUpdate: false,
};
const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    updateJournal(state, action) {
      state.journals = [...action.payload];
    },
    addJournal(state, action) {
      const newJournal = action.payload;
      state.isJournalUpdate = true;
      state.journals.push(newJournal);
    },
    removeJournal(state, action) {
      const id = action.payload;
      state.isJournalUpdate = true;
      // const existingJournal = state.journals.find(Journal => Journal.id === id);
      state.journals = state.journals.filter((journal) => journal.id !== id);
    },
  },
});

export const { addJournal, removeJournal, updateJournal} =
  journalSlice.actions;
export default journalSlice.reducer;
