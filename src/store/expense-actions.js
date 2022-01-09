import {updateExpenses} from "./expense-slice";


 
export const sendData = (expenses) => {
    return async () => {
      const sendRequest = async () => {
        const response = await fetch(
          "https://expense-manager-react-e031e-default-rtdb.firebaseio.com/expenses.json",
          {
            method: "PUT",
            body: JSON.stringify(expenses),
          }
        );
        const responseData = await response.json();
        console.log("responseData");
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
  
  export const getExpenses = () => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
          "https://expense-manager-react-e031e-default-rtdb.firebaseio.com/expenses.json"
        );
  
        if (!response.ok) {
          throw new Error("Fetching Data Failed!");
        }
        const data = await response.json();
        data.map((item, index)=>{
          item.id = index;
        })
        dispatch(updateExpenses(data))
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
  