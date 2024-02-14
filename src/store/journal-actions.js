import { baseUrl } from "../common/AppConstants";
import {updateJournal} from "./journal-slice";

export const sendJournalData = (journals) => {
    return async () => {
      const sendRequest = async () => {
        const response = await fetch(
          `${baseUrl}/journals.json`,
          {
            method: "PUT",
            body: JSON.stringify(journals),
          }
        );
        const responseData = await response.json();
        console.log("journals");
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
  
  export const getJournal = () => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
          `${baseUrl}/journals.json`);
  
        if (!response.ok) {
          throw new Error("Fetching Data Failed!");
        }
        const data = await response.json();
        data.map((item, index)=>{
          item.id = index;
        })
        dispatch(updateJournal(data))
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
  