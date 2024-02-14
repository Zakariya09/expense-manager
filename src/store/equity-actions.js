import { baseUrl } from "../common/AppConstants";
import {updateEquity} from "./equity-slice";

export const sendEquityData = (equities) => {
    return async () => {
      const sendRequest = async () => {
        const response = await fetch(
          `${baseUrl}/equities.json`,
          {
            method: "PUT",
            body: JSON.stringify(equities),
          }
        );
        const responseData = await response.json();
        console.log("equities");
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
  
  export const getEquity = () => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
          `${baseUrl}/equities.json`);
  
        if (!response.ok) {
          throw new Error("Fetching Data Failed!");
        }
        const data = await response.json();
        data.map((item, index)=>{
          item.id = index;
        })
        dispatch(updateEquity(data))
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
  