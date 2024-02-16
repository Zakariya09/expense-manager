import { baseUrl } from "../common/AppConstants";
import { showAlert } from "./expense-slice";
import { updateJournal } from "./journal-slice";

export const sendJournalData = (journals) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${baseUrl}/journals.json`,
        {
          method: "PUT",
          body: JSON.stringify(journals),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Sending Data Failed!");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
        dispatch(showAlert());
    }
  };
};

export const getJournal = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/journals.json`);

      if (!response.ok) {
        throw new Error("Fetching Data Failed!");
      }
      const data = await response.json();
      data.map((item, index) => {
        item.id = index;
      })
      dispatch(updateJournal(data))
      return data;
    };
    try {
      const response = await fetchData();
    } catch (error) {
        dispatch(showAlert());
    }
  };
};
