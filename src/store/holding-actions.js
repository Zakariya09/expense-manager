import { baseUrl } from "../common/AppConstants";
import { updateHolding } from "./holding-slice";

export const sendHoldingData = (holdings) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(
        `${baseUrl}/holdings.json`,
        {
          method: "PUT",
          body: JSON.stringify(holdings),
        }
      );
      const responseData = await response.json();
      console.log("holdings");
      console.log(responseData);
      if (!response.ok) {
        throw new Error("Sending Data Failed!");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHolding = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/holdings.json`);

      if (!response.ok) {
        throw new Error("Fetching Data Failed!");
      }
      const data = await response.json();
      data.map((item, index) => {
        item.id = index;
      });
      dispatch(updateHolding(data));
      return data;
    };
    try {
      const response = await fetchData();
      console.log("response");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};
