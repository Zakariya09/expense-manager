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
import { sendJournalData, getJournal } from "./store/journal-actions";
import { sendEquityData, getEquity } from "./store/equity-actions";
import { sendHoldingData, getHolding } from "./store/holding-actions";
import { useDispatch } from "react-redux";

let isInitial = true;
function App() {
  const LoginComponent = React.lazy(() => import("./pages/Login"));
  const ManageExpense = React.lazy(() => import("./pages/ManageExpense"));
  const HalalCheck = React.lazy(() => import("./pages/HalalCheck"));
  const ManageSalary = React.lazy(() => import("./pages/ManageSalary"));
  const StockJournal = React.lazy(() => import("./pages/StockJournal"));
  const ManageEquity = React.lazy(() => import("./pages/ManageEquity"));
  const ManageHolding = React.lazy(() => import("./pages/ManageHolding"));

  const expenses = useSelector((state) => state.expense.expenses);
  const change = useSelector((state) => state.expense.change);
  const userObj = useSelector((state) => state.auth.userObj);
  const salaries = useSelector((state) => state.salary.salaries);
  const journals = useSelector((state) => state.journal.journals);
  const equities = useSelector((state) => state.equity.equities);
  const holdings = useSelector((state) => state.holding.holdings);
  const isSalaryUpdate = useSelector((state) => state.salary.isSalaryUpdate);
  const isJournalUpdate = useSelector((state) => state.journal.isJournalUpdate);
  const isEquityUpdate = useSelector((state) => state.equity.isEquityUpdate);
  const isHoldingUpdate = useSelector((state) => state.holding.change);

  const isLoggedIn =
    localStorage.getItem("userObject") &&
    Object.keys(JSON.parse(localStorage.getItem("userObject"))).length !== 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getSalary());
    dispatch(getJournal());
    dispatch(getEquity());
    dispatch(getHolding());
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

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isJournalUpdate) {
      dispatch(sendJournalData(journals));
    }
  }, [journals, isJournalUpdate]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isEquityUpdate) {
      dispatch(sendEquityData(equities));
    }
  }, [equities, isEquityUpdate]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isHoldingUpdate) {
      dispatch(sendHoldingData(holdings));
    }
  }, [holdings, isHoldingUpdate]);
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
            <Route path="/manage-journal" exact>
              {isLoggedIn ? <StockJournal /> : <Redirect to="/login" />}
            </Route>
            <Route path="/manage-equity" exact>
              {isLoggedIn ? <ManageEquity /> : <Redirect to="/login" />}
            </Route>
            <Route path="/manage-holding" exact>
              {isLoggedIn ? <ManageHolding /> : <Redirect to="/login" />}
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
