import { baseUrl } from "../common/AppConstants";
import { showAlert, hideLoader, getJournal, resetState } from "./journal-slice";

export const saveJournal = (journal, isUpdate) => {
  let url = `${baseUrl}/journals.json`;
  let method = 'POST';
  if (isUpdate) {
    url = `${baseUrl}/journals/${journal.id}.json`;
    method = 'PUT';
  }
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        url,
        {
          method: method,
          body: JSON.stringify(journal),
        }
      );
      const responseData = await response.json();
      dispatch(hideLoader())
      if (!response.ok) {
        throw new Error("Sending Data Failed!");
      }
    };
    try {
      await sendRequest();
      await dispatch(getJournals());
    } catch (error) {
      dispatch(showAlert())
      dispatch(hideLoader());
      dispatch(resetState());
    }
  };
};

export const getJournals = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/journals.json`);

      if (!response.ok) {
        throw new Error("Fetching Data Failed!");
      }
      const resp = await response.json();

      const journalArr = [];
      for (const key in resp) {
        if (resp.hasOwnProperty(key)) {
          journalArr.push({ id: key, ...resp[key] })
        }
      }
      return journalArr;
    };
    try {
      const response = await fetchData();
      dispatch(getJournal(response))
    } catch (error) {
      dispatch(showAlert());
      dispatch(resetState());
    }
  };
};

export const deleteJournal = (journal) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${baseUrl}/journals/${journal.id}.json`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      dispatch(hideLoader())
      if (!response.ok) {
        throw new Error("Sending Data Failed!");
      }
    };
    try {
      await sendRequest();
      await dispatch(getJournals());
    } catch (error) {
      dispatch(showAlert())
      dispatch(hideLoader());
      dispatch(resetState());
    }
  };
};
