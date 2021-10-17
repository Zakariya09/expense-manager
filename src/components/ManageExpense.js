import React, { useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import expenseClasses from "./ManageExpenseLayout.module.css";
import { Divider } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import Table from "../common/Table";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import {addExpense, removeExpense} from "../store/expense-slice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  floatRight: {
    float: "right",
    margin: "12px",
  },
  modalTitle: {
    display: " flex",
    flexDirection: " row",
    padding: " 12px",
    margin: " -17px -33px 12px -33px",
    overflowX: " hidden",
    background: " violet",
  },
}));

function createData(name, amount, date) {
  return { name, amount, date };
}

const rows = [
  { id: "12", name: "Grocery", amount: "1200", date: "15-08-2021" },
];
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "amount", label: "Amount", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
];

const ManageExpense = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [enteredName, setEnteredName] = React.useState("");
  const [enteredAmount, setEnteredAmount] = React.useState("");
  const [enteredDate, setEnteredDate] = React.useState(new Date());
  const [enteredNameIsTouched, setEnteredNameIsTouched] = React.useState(false);
  const [enteredAmountIsTouched, setEnteredAmountIsTouched] =
    React.useState(false);
  const [enteredDateIsTouched, setEnteredDateIsTouched] = React.useState(false);
  const dispatch = useDispatch();
  const [] = useReducer();

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredNameIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  const enteredAmountIsValid = enteredAmount.trim() !== "";
  const enteredAmountIsInvalid =
    !enteredAmountIsValid && enteredAmountIsTouched;
  const enteredDateIsValid = enteredAmount.trim() !== "";
  const enteredDateIsInvalid = !enteredDateIsValid && enteredDateIsTouched;
  const getData = () => {};
  let formIsValid = false;
  if (enteredNameIsValid && enteredAmountIsValid && enteredDateIsValid) {
    formIsValid = true;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameBlurHandler = (event) => {
    setEnteredNameIsTouched(true);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const amountBlurHandler = (event) => {
    setEnteredAmountIsTouched(true);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event);
  };
  const dateBlurHandler = (event) => {
    setEnteredDateIsTouched(true);
  };

  const formHandler = (event) => {
    event.preventDefault();
    setEnteredNameIsTouched(true);
    if (!enteredNameIsValid) {
      return;
    }
    const obj = {
      name: enteredName,
      amount: enteredAmount,
      date: enteredDate,
    };
    dispatch(addExpense(obj));

    console.log("obj");
    console.log(obj);

    // let db = getDatabase();
    // push(ref(db, 'expenses'), obj);
    // return;

    // database.child("expenses").push(obj);

    setEnteredName("");
    setEnteredNameIsTouched(false);
    setEnteredAmount("");
    setEnteredAmountIsTouched(false);
    setEnteredDate(new Date());
    setEnteredDateIsTouched(false);
    handleClose();
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item md={12} xs={12} sm={12}>
          <div>
            <Button
              type="button"
              onClick={handleOpen}
              variant="contained"
              color="primary"
              className={classes.floatRight}
            >
              <span className="material-icons">add</span> Add Expense
            </Button>
          </div>
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          <section className={expenseClasses.tableSection}>
            <Table rows={rows} columns={columns} />
          </section>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <div
                  className={`${classes.modalTitle} ${expenseClasses.modalHeader}`}
                >
                  <h2 id="transition-modal-title">Add Expenses</h2>
                  {/* <Typography variant="h3" id="transition-modal-title" gutterBottom>
              Add Expenses
              </Typography> */}
                </div>
                <Divider />
                <div>
                  <form
                    onSubmit={formHandler}
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                  >
                    <Grid container>
                      <Grid item md={2} xs={3}>
                        <label>Name :</label>
                      </Grid>
                      <Grid item md={8} xs={9}>
                        <TextField
                          label="Name"
                          id="name"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={nameChangeHandler}
                          onBlur={nameBlurHandler}
                          value={enteredName}
                        />
                        {enteredNameIsInvalid && (
                          <p className={expenseClasses.errorText}>
                            Please enter name.
                          </p>
                        )}
                      </Grid>
                      <Grid item md={2} xs={0}></Grid>
                      <Grid item md={2} xs={3}>
                        <label>Amount :</label>
                      </Grid>
                      <Grid item md={8} xs={8}>
                        <TextField
                          label="Amount"
                          id="amount"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={amountChangeHandler}
                          onBlur={amountBlurHandler}
                          value={enteredAmount}
                          type="number"
                          min="1"
                        />
                        {enteredAmountIsInvalid && (
                          <p className={expenseClasses.errorText}>
                            Please enter amount.
                          </p>
                        )}
                      </Grid>
                      <Grid item md={2} xs={1}></Grid>
                      <Grid item md={2} xs={3}>
                        <label>Date :</label>
                      </Grid>
                      <Grid item md={8} xs={8}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date"
                              label="Date"
                              format="MM/dd/yyyy"
                              onChange={dateChangeHandler}
                              onBlur={dateBlurHandler}
                              style={{ width: "100%" }}
                              variant="outlined"
                              value={enteredDate}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                        {enteredDateIsInvalid && (
                          <p className={expenseClasses.errorText}>
                            Please Select date.
                          </p>
                        )}
                      </Grid>
                    </Grid>
                    <Divider />
                    <div>
                      <Grid container spacing={1}>
                        <Grid item md={8} xs={2}></Grid>
                        <Grid item md={4} xs={10}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!formIsValid}
                          >
                            <span className="material-icons">save</span> Save
                          </Button>{" "}
                          &nbsp;&nbsp;
                          <Button
                            type="button"
                            onClick={handleClose}
                            variant="contained"
                            color="secondary"
                          >
                            <span className="material-icons">close</span> Close
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </form>
                </div>
              </div>
            </Fade>
          </Modal>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ManageExpense;
