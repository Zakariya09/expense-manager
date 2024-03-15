import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { Fragment } from "react";
import "./App.css";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { saveExpense, getExpenses, deleteExpense } from "./store/expense-actions";
import { saveSalary, deleteSalary, getSalaries } from "./store/salary-actions";
import { deleteJournal, getJournals, saveJournal } from "./store/journal-actions";
import { getEquities, deleteEquity, saveEquity } from "./store/equity-actions";
import { sendHoldingData, getHolding } from "./store/holding-actions";
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import ManageExpenseContainer from "./pages/ManageExpense";
import HalalCheckContainer from "./pages/HalalCheck";
import ManageSalaryContainer from "./pages/ManageSalary";
import StockJournalPage from "./pages/StockJournal";
import ManageEquityContainer from "./pages/ManageEquity";
import ManageHolding from "./pages/ManageHolding";
import Root from "./Layout/Root";

let isInitial = true;
function App() {

  const expenses = useSelector((state) => state.expense.expenses);
  const isExpenseUpdate = useSelector((state) => state.expense.change);
  const userObj = useSelector((state) => state.auth.userObj);
  const salaries = useSelector((state) => state.salary.salaries);
  const journals = useSelector((state) => state.journal.journals);
  const equities = useSelector((state) => state.equity.equities);
  const holdings = useSelector((state) => state.holding.holdings);
  const isSalaryUpdate = useSelector((state) => state.salary.change);
  const isJournalUpdate = useSelector((state) => state.journal.change);
  const isEquityUpdate = useSelector((state) => state.equity.change);
  const isHoldingUpdate = useSelector((state) => state.holding.change);
  const expenseState = useSelector((state) => state.expense);
  const salaryState = useSelector((state) => state.salary);
  const jornalState = useSelector((state) => state.journal);
  const equityState = useSelector((state) => state.equity);

  const isLoggedIn =
    localStorage.getItem("userObject") &&
    Object.keys(JSON.parse(localStorage.getItem("userObject"))).length !== 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getSalaries());
    dispatch(getJournals());
    dispatch(getEquities());
    dispatch(getHolding());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (expenseState.action == 'delete') {
      dispatch(deleteExpense(expenseState.selectedExpense));
    }

    if (expenseState.action == 'save') {
      dispatch(saveExpense(expenseState.selectedExpense, expenseState.isUpdate));
    }
  }, [expenses, isExpenseUpdate]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (salaryState.action == 'delete') {
      dispatch(deleteSalary(salaryState.selectedSalary));
    }

    if (salaryState.action == 'save') {
      dispatch(saveSalary(salaryState.selectedSalary, salaryState.isUpdate));
    }
  }, [salaries, isSalaryUpdate]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (jornalState.action == 'delete') {
      dispatch(deleteJournal(jornalState.selectedJournal));
    }

    if (jornalState.action == 'save') {
      dispatch(saveJournal(jornalState.selectedJournal, jornalState.isUpdate));
    }
  }, [journals, isJournalUpdate]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (equityState.action == 'delete') {
      dispatch(deleteEquity(equityState.selectedEquity));
    }

    if (equityState.action == 'save') {
      dispatch(saveEquity(equityState.selectedEquity, equityState.isUpdate));
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
  const router = createBrowserRouter([
    {
      path: '/', element: <Root />, errorElement: <NotFound />,
      children: [
        { path: '/', element: <Login />, errorElement: <NotFound /> },
        { path: '/login', element: <Login />, errorElement: <NotFound /> },
        { path: "/manage-expense", element: <ManageExpenseContainer />, errorElement: <NotFound /> },
        { path: "/halal-check", element: <HalalCheckContainer />, errorElement: <NotFound /> },
        { path: "/manage-income", element: <ManageSalaryContainer />, errorElement: <NotFound /> },
        { path: "/manage-journal", element: <StockJournalPage />, errorElement: <NotFound /> },
        { path: "/manage-equity", element: <ManageEquityContainer />, errorElement: <NotFound /> },
        { path: "/manage-holding", element: <ManageHolding />, errorElement: <NotFound /> }
      ]
    }
  ]);

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
