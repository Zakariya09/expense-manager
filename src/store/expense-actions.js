import { baseUrl } from "../common/AppConstants";
import { showAlert, hideLoader, getExpense, resetState } from "./expense-slice";

export const saveExpense = (expense, isUpdate) => {
  let url = `${baseUrl}/expenses.json`;
  let method = 'POST';
  if (isUpdate) {
    url = `${baseUrl}/expenses/${expense.id}.json`;
    method = 'PUT';
  }
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        url,
        {
          method: method,
          body: JSON.stringify(expense),
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
      await dispatch(getExpenses());
    } catch (error) {
      dispatch(showAlert())
      dispatch(hideLoader());
      dispatch(resetState());
    }
  };
};

export const getExpenses = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/expenses.json`);

      if (!response.ok) {
        throw new Error("Fetching Data Failed!");
      }
      const resp = await response.json();

      const expenseArr = [];
      for (const key in resp) {
        if (resp.hasOwnProperty(key)) {
          expenseArr.push({ id: key, ...resp[key] })
        }
      }
      return expenseArr;
    };
    try {
      const response = await fetchData();
      dispatch(getExpense(response))
    } catch (error) {
      dispatch(showAlert());
      dispatch(resetState());
    }
  };
};

export const deleteExpense = (expense) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${baseUrl}/expenses/${expense.id}.json`,
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
      await dispatch(getExpenses());
    } catch (error) {
      dispatch(showAlert())
      dispatch(hideLoader());
      dispatch(resetState());
    }
  };
};
