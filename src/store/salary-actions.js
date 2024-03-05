import { baseUrl } from "../common/AppConstants";
import { showAlert, hideLoader, getSalary, resetState } from "./salary-slice";

export const saveSalary = (salary, isUpdate) => {
  let url = `${baseUrl}/salaries.json`;
  let method = 'POST';
  if (isUpdate) {
    url = `${baseUrl}/salaries/${salary.id}.json`;
    method = 'PUT';
  }
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        url,
        {
          method: method,
          body: JSON.stringify(salary),
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
      await dispatch(getSalaries());
    } catch (error) {
      dispatch(showAlert())
      dispatch(hideLoader());
      dispatch(resetState());
    }
  };
};

export const getSalaries = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/salaries.json`);

      if (!response.ok) {
        throw new Error("Fetching Data Failed!");
      }
      const resp = await response.json();

      const salaryArr = [];
      for (const key in resp) {
        if (resp.hasOwnProperty(key)) {
          salaryArr.push({ id: key, ...resp[key] })
        }
      }
      return salaryArr;
    };
    try {
      const response = await fetchData();
      dispatch(getSalary(response))
    } catch (error) {
      dispatch(showAlert());
      dispatch(resetState());
    }
  };
};

export const deleteSalary = (salary) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `${baseUrl}/salaries/${salary.id}.json`,
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
      await dispatch(getSalaries());
    } catch (error) {
      dispatch(showAlert())
      dispatch(hideLoader());
      dispatch(resetState());
    }
  };
};
