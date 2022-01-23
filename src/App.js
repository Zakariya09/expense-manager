import { Route, Switch, Redirect } from "react-router-dom";
import React, { Fragment, Suspense } from "react";
import "./App.css";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Laodign";
import Layout from "./Layout/Layout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sendData, getExpenses } from "./store/expense-actions";
import { sendSalaryData, getSalary } from "./store/salary-actions";
import { useDispatch } from "react-redux";

let isInitial = true;
function App() {
  const LoginComponent = React.lazy(() => import("./pages/Login"));
  const ManageExpense = React.lazy(() => import("./pages/ManageExpense"));
  const HalalCheck = React.lazy(() => import("./pages/HalalCheck"));
  const ManageSalary = React.lazy(() => import("./pages/ManageSalary"));
  const expenses = useSelector((state) => state.expense.expenses);
  const change = useSelector((state) => state.expense.change);
  const userObj = useSelector((state) => state.auth.userObj);
  const salaries = useSelector((state) => state.salary.salaries);
  const isSalaryUpdate = useSelector((state) => state.salary.isSalaryUpdate);

  const isLoggedIn =
    localStorage.getItem("userObject") &&
    Object.keys(JSON.parse(localStorage.getItem("userObject"))).length !== 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getSalary());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (change) {
      dispatch(sendData(expenses));
    }
  }, [expenses, change]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isSalaryUpdate) {
      dispatch(sendSalaryData(salaries));
    }
  }, [salaries, isSalaryUpdate]);

  // useEffect(() => {
  //   console.log("isLoggedIn")
  //   console.log(isLoggedIn)
  //   console.log("userObj")
  //   console.log(userObj)
  //   if (isLoggedIn) {
  //     localStorage.setItem("userObject", JSON.stringify(userObj));
  //   }
  // }, [userObj]);

  return (
    <Fragment>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact>
              {isLoggedIn ? (
                <Redirect to="/halal-check" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/manage-expense" exact>
              {isLoggedIn ? <ManageExpense /> : <Redirect to="/login" />}
            </Route>
            <Route path="/halal-check" exact>
              {isLoggedIn ? <HalalCheck /> : <Redirect to="/login" />}
            </Route>
            <Route path="/manage-salary" exact>
              {isLoggedIn ? <ManageSalary /> : <Redirect to="/login" />}
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </Fragment>
  );
}

export default App;
