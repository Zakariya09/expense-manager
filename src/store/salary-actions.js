import { baseUrl } from "../common/AppConstants";
import { showAlert } from "./expense-slice";
import { updateSalary } from "./salary-slice";

export const sendSalaryData = (salaries) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${baseUrl}/salaries.json`,
        {
          method: "PUT",
          body: JSON.stringify(salaries),
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

export const getSalary = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/salaries.json`);

      if (!response.ok) {
        throw new Error("Fetching Data Failed!");
      }
      const data = await response.json();
      data.map((item, index) => {
        item.id = index;
      })
      dispatch(updateSalary(data))
      return data;
    };
    try {
      const response = await fetchData();
    } catch (error) {
        dispatch(showAlert());
    }
  };
};
