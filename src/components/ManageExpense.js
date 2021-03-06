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
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { addExpense, removeExpense } from "../store/expense-slice";
import moment from "moment";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
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
    background: "#5521d3c7",
    "& h2": {
      filter: "drop-shadow(3px 0px 8px white )",
      color: "white",
    },
  },
  modalActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    "& button": {
      textTransform: "capitalize",
    },
  },
  deleteContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg": {
      color: "red",
      fontSize: "5rem",
      margin: "1rem",
    },
    "& h6": {
      margin: "1rem",
    },
  },
  totalExpense: {
    background: "#ff0909e0",
    color: "white",
    padding: "2px",
    marginBottom:"5px",
    width: "calc(100% - 2rem)",
    border: "1px solid red",
    boxShadow: "-1px 0px 14px red",
    "& h5": {
      fontWeight: "bold",
      // padding: "13px",
      textAlign: "center",
      fontSize: "30px",
    },
    "& span": {
      textAlign: "center",
    },
  },
  currentExpense: {
    background: "#3a09ffe0",
    color: "white",
    padding: "2px",
    marginBottom:"5px",
    width: "calc(100% - 2rem)",
    border: "1px solid #3a09ffe0",
    boxShadow: "-1px 0px 14px #3a09ffe0",
    "& h5": {
      fontWeight: "bold",
      // padding: "13px",
      textAlign: "center",
      fontSize: "30px",
    },
    "& span": {
      textAlign: "center",
    },
  },
  savingsCard: {
    background: "#24ff09d9",
    color: "white",
    padding: "2px",
    marginBottom:"5px",
    width: "calc(100% - 2rem)",
    border: "1px solid #24ff09d9",
    boxShadow: "-1px 0px 14px #24ff09d9",
    "& h5": {
      fontWeight: "bold",
      // padding: "13px",
      textAlign: "center",
      fontSize: "30px",
    },
    "& span": {
      textAlign: "center",
    },
  },
  investCard: {
    background: "#8909ffd9",
    color: "white",
    padding: "2px",
    marginBottom:"5px",
    width: "calc(100% - 2rem)",
    border: "1px solid #8909ffd9",
    boxShadow: "-1px 0px 14px #8909ffd9",
    "& h5": {
      fontWeight: "bold",
      // padding: "13px",
      textAlign: "center",
      fontSize: "30px",
    },
    "& span": {
      textAlign: "center",
    },
  },
}));

function createData(name, amount, date) {
  return { name, amount, date };
}

// const rows = [
//   { id: "12", name: "Grocery", amount: "1200", date: "15-08-2021" },
// ];
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "amount", label: "Amount", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "Actions", label: "Actions", minWidth: 10 },
];

const ManageExpense = () => {
  const rows = useSelector((state) => state.expense.expenses);
  let totalAmount = 0;
  let currentMonthExpense = 0;
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getYear() + 1900;
  const totalExpenses = rows.forEach((item) => {
    totalAmount += Number(item.amount);
    if(Number(item.date.split("-")[1]) === currentMonth && Number(item.date.split("-")[2]) === currentYear){
      currentMonthExpense += Number(item.amount);
    }
  });
  console.log("totalAmount");
  console.log(totalAmount);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const [enteredName, setEnteredName] = React.useState("");
  const [enteredAmount, setEnteredAmount] = React.useState("");
  const [enteredDate, setEnteredDate] = React.useState(new Date());
  const [enteredNameIsTouched, setEnteredNameIsTouched] = React.useState(false);
  const [enteredAmountIsTouched, setEnteredAmountIsTouched] =
    React.useState(false);
  const [enteredDateIsTouched, setEnteredDateIsTouched] = React.useState(false);
  const [data, setData] = React.useState({});
  const dispatch = useDispatch();
  const [] = useReducer();

  const handleDelete = (expenseObj) => {
    setShowDeleteModal(true);
    setData(expenseObj);
  };
  const deleteExpense = () => {
    dispatch(removeExpense(data.id));
  };
  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredNameIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  const enteredAmountIsValid = enteredAmount.trim() !== "";
  const enteredAmountIsInvalid =
    !enteredAmountIsValid && enteredAmountIsTouched;
  const enteredDateIsValid = enteredAmount.trim() !== "";
  const enteredDateIsInvalid = !enteredDateIsValid && enteredDateIsTouched;
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

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
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
      date: moment(enteredDate).format("DD-MM-YYYY"),
    };
    dispatch(addExpense(obj));

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
     <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Expense Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
        <Grid item md={2} xs={6} sm={6}>
          <Paper elevation={1} className={classes.totalExpense}>
            <Typography variant="h5" gutterBottom>
              {totalAmount}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Total Expense
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={2} xs={6} sm={6}>
          <Paper elevation={1} className={classes.currentExpense}>
            <Typography variant="h5" gutterBottom>
              {currentMonthExpense}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Expense This Month
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={2} xs={6} sm={6}>
          <Paper elevation={1} className={classes.savingsCard}>
            <Typography variant="h5" gutterBottom>
              {totalAmount}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Total Savings
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={2} xs={6} sm={6}>
          <Paper elevation={1} className={classes.investCard}>
            <Typography variant="h5" gutterBottom>
              {totalAmount}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Total Invested
            </Typography>
          </Paper>
        </Grid>
      </Grid>
        </AccordionDetails>
      </Accordion>
     
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
            <Table rows={rows} columns={columns} handleDelete={handleDelete} />
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
                      <Grid item md={2} xs={12} sm={12}>
                        <label>Name :</label>
                      </Grid>
                      <Grid item md={10} xs={12} sm={12}>
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
                      <Grid item md={2} xs={12} sm={12}>
                        <label>Amount :</label>
                      </Grid>
                      <Grid item md={10} xs={12} sm={12}>
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
                      <Grid item md={2} xs={12} sm={12}>
                        <label>Date :</label>
                      </Grid>
                      <Grid item md={10} xs={8}>
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
                    <Grid container spacing={1}>
                      <Grid item md={8} xs={2}></Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        sm={12}
                        className={classes.modalActions}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={!formIsValid}
                        >
                          <span className="material-icons">save</span> Save
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          type="button"
                          onClick={handleClose}
                          variant="contained"
                          color="secondary"
                        >
                          <span className="material-icons">close</span> Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </div>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={showDeleteModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={showDeleteModal}>
              <div className={classes.paper}>
                <div className={classes.deleteContent}>
                  <DeleteIcon />
                  <Typography variant="h4" gutterBottom>
                    Are you sure wants to delete the record?
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Once deleted, you will not be able to recover this record!
                  </Typography>
                </div>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item md={8} xs={2}></Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    className={classes.modalActions}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={deleteExpense}
                    >
                      <DeleteIcon /> Delete
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      type="button"
                      onClick={handleDeleteClose}
                      variant="contained"
                      color="secondary"
                    >
                      <span className="material-icons">close</span> Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </Modal>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ManageExpense;
