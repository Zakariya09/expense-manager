import React, { useEffect, useState } from "react";
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
import { connect } from "react-redux";
import { addExpense, removeExpense } from "../store/expense-slice";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { appStrings, expenseGridColumn } from "../common/AppConstants";

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
    width: '50%'
  },
  floatRight: {
    float: "right",
    margin: "12px",
  },
  modalTitle: {
    display: " flex",
    flexDirection: " row",
    padding: "0px 0px 0px 12px",
    margin: " -17px -33px 12px -33px",
    overflowX: " hidden",
    background: 'linear-gradient(to right, #780206, #061161)',
    "& h2": {
      filter: "drop-shadow(3px 0px 8px white )",
      color: "white",
    },
  },
  modalActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    marginTop: '12px',
    gap: '1rem',
    "& button": {
      textTransform: "capitalize",
    },
  },
  deleteContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg": {
      color: "#780206",
      fontSize: "5rem",
      margin: "1rem",
    },
    "& h6": {
      margin: "1rem",
    },
  },
  totalExpense: {
    background: 'linear-gradient(to bottom, #780206 , #061161)',
    color: "white",
    padding: "2px",
    marginBottom: "5px",
    width: "calc(100% - 2rem)",
    border: "1px solid #780206",
    boxShadow: "-1px 0px 14px #780206",
    "& h5": {
      textShadow: '0px 0px 18px white',
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "30px",
    },
    "& span": {
      textAlign: "center",
    },
  },
  currentExpense: {
    background: 'linear-gradient(to bottom, #780206, #061161)',
    color: "white",
    padding: "2px",
    marginBottom: "5px",
    width: "calc(100% - 2rem)",
    border: "1px solid #061161",
    boxShadow: "-1px 0px 14px #061161",
    "& h5": {
      textShadow: '0px 0px 18px white',
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "30px",
    },
    "& span": {
      textAlign: "center",
    },
  },
  savingsCard: {
    background: 'linear-gradient(to top, #061161, #780206)',
    color: "white",
    padding: "2px",
    marginBottom: "5px",
    width: "calc(100% - 2rem)",
    border: "1px solid #780206",
    boxShadow: "-1px 0px 14px #780206",
    "& h5": {
      textShadow: '0px 0px 18px white',
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "30px",
    },
    "& span": {
      textAlign: "center",
    },
  },
  investCard: {
    background: 'linear-gradient(to bottom, #780206, #061161)',
    color: "white",
    padding: "2px",
    marginBottom: "5px",
    width: "calc(100% - 2rem)",
    border: "1px solid #061161",
    boxShadow: "-1px 0px 14px #061161",
    "& h5": {
      textShadow: '0px 0px 18px white',
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "30px",
    },
    "& span": {
      textAlign: "center",
    },
  },
  textDanger: {
    color: '#780206',
    margin: '0px 9px',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '12px',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '47px',
  }
}));

const ManageExpense = (props) => {
  const rows = props.tableRows;
  let totalAmount = 0;
  let currentMonthExpense = 0;
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getYear() + 1900;
  const totalExpenses = rows.forEach((item) => {
    totalAmount += Number(item.amount);
    if (Number(item.date.split("-")[1]) === currentMonth && Number(item.date.split("-")[2]) === currentYear) {
      currentMonthExpense += Number(item.amount);
    }
  });

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const [enteredName, setEnteredName] = React.useState("");
  const [enteredAmount, setEnteredAmount] = React.useState("");
  const [enteredDate, setEnteredDate] = React.useState(new Date());
  const [enteredNameIsTouched, setEnteredNameIsTouched] = React.useState(false);
  const [enteredAmountIsTouched, setEnteredAmountIsTouched] = React.useState(false);
  const [enteredDateIsTouched, setEnteredDateIsTouched] = React.useState(false);
  const [data, setData] = React.useState({});
  const isLoading = props.isLoading;
  const [isUpdate, setIsUpdate] = useState(false);
  const [expenseRecord, setExpenseRecord] = React.useState([]);

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredNameIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  const enteredAmountIsValid = enteredAmount.trim() !== "";
  const enteredAmountIsInvalid =
    !enteredAmountIsValid && enteredAmountIsTouched;
  const enteredDateIsValid = (enteredDate !== null && (enteredDate).toString() !== 'Invalid Date');
  const enteredDateIsInvalid = ((enteredDate !== null && (enteredDate).toString() == 'Invalid Date') && enteredDateIsTouched) || enteredDate == null;
  let formIsValid = false;
  if (enteredNameIsValid && enteredAmountIsValid && enteredDateIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (!isLoading) {
      setOpen(false);
      setShowDeleteModal(false);
      setExpenseRecord(rows)
    }
  }, [isLoading, rows]);

  const handleDelete = (expenseObj) => {
    setShowDeleteModal(true);
    setData(expenseObj);
  };

  const deleteExpense = () => {
    props.removeExpense(data.id);
  };

  const handleOpen = () => {
    setIsUpdate(false);
    resetForm();
    setOpen(true);
  };

  const resetForm = () => {
    setEnteredName("");
    setEnteredAmount("");
    setEnteredDate(new Date());
    setEnteredNameIsTouched(false);
    setEnteredAmountIsTouched(false);
    setEnteredDateIsTouched(false);
  }

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

  const handleEdit = (expenseObj) => {
    setIsUpdate(prevState => true)
    setEnteredName(expenseObj.name)
    setEnteredAmount(expenseObj.amount)
    setEnteredDate(new Date(expenseObj.date.split("-").reverse().join("-")))
    setOpen(true);
    setData(expenseObj);
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
      ...(isUpdate && { id: data.id })
    };

    props.addExpense({ obj, isUpdate });
    setEnteredName("");
    setEnteredNameIsTouched(false);
    setEnteredAmount("");
    setEnteredAmountIsTouched(false);
    setEnteredDate(new Date());
    setEnteredDateIsTouched(false);
  };

  return (
    <Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{appStrings.expenseSummary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item md={2} xs={6} sm={6}>
              <Paper elevation={1} className={classes.totalExpense}>
                <Typography variant="h5" gutterBottom>
                  {totalAmount}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {appStrings.totalExpense}
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={2} xs={6} sm={6}>
              <Paper elevation={1} className={classes.currentExpense}>
                <Typography variant="h5" gutterBottom>
                  {currentMonthExpense}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {appStrings.expenseThisMonth}
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={2} xs={6} sm={6}>
              <Paper elevation={1} className={classes.savingsCard}>
                <Typography variant="h5" gutterBottom>
                  {totalAmount}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {appStrings.totalSavings}
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={2} xs={6} sm={6}>
              <Paper elevation={1} className={classes.investCard}>
                <Typography variant="h5" gutterBottom>
                  {totalAmount}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {appStrings.totalInvested}
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
              <span className="material-icons">add</span> {appStrings.addExpense}
            </Button>
          </div>
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          <section className={expenseClasses.tableSection}>
            <Table rows={expenseRecord} columns={expenseGridColumn}
              handleDelete={handleDelete}
              handleEdit={handleEdit} />
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
                  className={`${classes.modalTitle}`}
                >
                  <h2 id="transition-modal-title">{isUpdate ? appStrings.updateExpense : appStrings.addExpense}</h2>
                </div>
                <div>
                  <form
                    onSubmit={formHandler}
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    id="expenseForm"
                  >
                    <Grid container>
                      <Grid item md={2} xs={12} sm={12}>
                        <label className={classes.label}>{appStrings.name} :</label>
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
                          <p className={classes.textDanger}>
                            {appStrings.enterNameWarningText}
                          </p>
                        )}
                      </Grid>
                      <Grid item md={2} xs={12} sm={12}>
                        <label className={classes.label}>{appStrings.amount} :</label>
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
                          <p className={classes.textDanger}>
                            {appStrings.amountWarningTest}
                          </p>
                        )}
                      </Grid>
                      <Grid item md={2} xs={12} sm={12}>
                        <label className={classes.label}>{appStrings.date} :</label>
                      </Grid>
                      <Grid item md={10} xs={8}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date"
                              label="Date"
                              format="dd/MM/yyyy"
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
                          <p className={classes.textDanger}>
                            {appStrings.dateWarningText}
                          </p>
                        )}
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={1}>
                      <Grid item md={7} xs={2}></Grid>
                      <Grid
                        item
                        md={5}
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
                          <span className="material-icons">save</span>&nbsp; {isUpdate ? appStrings.update : appStrings.save}
                        </Button>
                        <Button
                          type="button"
                          onClick={handleClose}
                          variant="contained"
                          color="secondary"
                        >
                          <span className="material-icons">close</span> {appStrings.cancel}
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
                <div
                  className={`${classes.modalTitle}`}
                >
                  <h2 id="transition-modal-title">{appStrings.deleteExpense}</h2>
                </div>
                <div className={classes.deleteContent}>
                  <DeleteIcon />
                  <Typography variant="h5" gutterBottom>
                    {appStrings.deleteConfirmText}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {appStrings.deleteWarningText}
                  </Typography>
                </div>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item md={7} xs={2}></Grid>
                  <Grid
                    item
                    md={5}
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
                      <DeleteIcon /> {appStrings.delete}
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => { setShowDeleteModal(false) }}
                    >
                      <span className="material-icons">close</span> {appStrings.cancel}
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

const mapStateToProp = (state) => {
  return {
    tableRows: state.expense.expenses,
    isLoading: state.expense.isLoading
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    removeExpense: (id) => dispatch(removeExpense(id)),
    addExpense: (obj) => dispatch(addExpense(obj))
  }

}

export default connect(mapStateToProp, mapDispatchToProp)(ManageExpense)