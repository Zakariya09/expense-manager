import { Route, Switch } from "react-router-dom";
import React, { Fragment, Suspense } from "react";
import "./App.css";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Laodign";
import Layout from "./Layout/Layout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sendData, getExpenses } from "./store/expense-actions";
import { useDispatch } from "react-redux";

let isInitial = true;
function App() {
  const LoginComponent = React.lazy(() => import("./pages/Login"));
  const ManageExpense = React.lazy(() => import("./pages/ManageExpense"));
  const HalalCheck = React.lazy(() => import("./pages/HalalCheck"));
  const expenses = useSelector((state) => state.expense.expenses);
  const change = useSelector((state) => state.expense.change);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  useEffect(() => {
    console.log("change");
    console.log(change);
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (change) {
      dispatch(sendData(expenses));
    }
  }, [expenses, change]);

  return (
    <Fragment>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact>
              <HalalCheck />
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/manageExpense" exact>
              <ManageExpense />
            </Route>
            <Route path="/halalCheck" exact>
              <HalalCheck />
            </Route>
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </Fragment>
  );
}

export default App;
