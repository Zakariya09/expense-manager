import { createStore } from "redux";
const storeReducer = (state, action) => {

  if (action.type === "login") {
    console.log("action.data");
    console.log(action.data);
    return "true";
  }
};

const store = createStore(storeReducer);

export default store;
