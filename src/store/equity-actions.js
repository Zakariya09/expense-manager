import { baseUrl } from "../common/AppConstants";
import { updateEquity } from "./equity-slice";
import { showAlert } from "./expense-slice";

export const sendEquityData = (equities) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${baseUrl}/equities.json`,
        {
          method: "PUT",
          body: JSON.stringify(equities),
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

export const getEquity = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/equities.json`);

      if (!response.ok) {
        throw new Error("Fetching Data Failed!");
      }
      const data = await response.json();
      data.map((item, index) => {
        item.id = index;
      })
      dispatch(updateEquity(data))
      return data;
    };
    try {
      const response = await fetchData();
    } catch (error) {
        dispatch(showAlert());
    }
  };
};
