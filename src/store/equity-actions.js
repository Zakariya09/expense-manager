import { baseUrl } from "../common/AppConstants";
import { showAlert, hideLoader, getEquity, resetState } from "./equity-slice";

export const saveEquity = (equity, isUpdate) => {
  let url = `${baseUrl}/equities.json`;
  let method = 'POST';
  if (isUpdate) {
    url = `${baseUrl}/equities/${equity.id}.json`;
    method = 'PUT';
  }
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        url,
        {
          method: method,
          body: JSON.stringify(equity),
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
      await dispatch(getEquities());
    } catch (error) {
      dispatch(showAlert())
      dispatch(hideLoader());
      dispatch(resetState());
    }
  };
};

export const getEquities = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/equities.json`);

      if (!response.ok) {
        throw new Error("Fetching Data Failed!");
      }
      const resp = await response.json();

      const equityArr = [];
      for (const key in resp) {
        if (resp.hasOwnProperty(key)) {
          equityArr.push({ id: key, ...resp[key] })
        }
      }
      return equityArr;
    };
    try {
      const response = await fetchData();
      dispatch(getEquity(response))
    } catch (error) {
      dispatch(showAlert());
      dispatch(resetState());
    }
  };
};

export const deleteEquity = (equity) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${baseUrl}/equities/${equity.id}.json`,
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
      await dispatch(getEquities());
    } catch (error) {
      dispatch(showAlert())
      dispatch(hideLoader());
      dispatch(resetState());
    }
  };
};
