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
import { connect, useDispatch } from "react-redux";
import { addSalary, removeSalary } from "../store/salary-slice";
import moment from "moment";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { appStrings, salaryGridColumn } from "../common/AppConstants";

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
}));

const ManageSalary = (props) => {
  const rows = props.tableRows;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const [enteredAmount, setEnteredAmount] = React.useState("");
  const [enteredDate, setEnteredDate] = React.useState(new Date());
  const [enteredAmountIsTouched, setEnteredAmountIsTouched] =
    React.useState(false);
  const [enteredDateIsTouched, setEnteredDateIsTouched] = React.useState(false);
  const [data, setData] = React.useState({});
  const isLoading = props.isLoading;
  const [salaryRecord, setSalaryRecord] = React.useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setOpen(false);
      setShowDeleteModal(false);
      setSalaryRecord(rows)
    }
  }, [isLoading, rows]);

  const handleDelete = (expenseObj) => {
    setShowDeleteModal(true);
    setData(expenseObj);
  };
  const deleteSalary = () => {
    props.removeSalary(data.id)
  };
  const enteredAmountIsValid = enteredAmount.trim() !== "";
  const enteredAmountIsInvalid =
    !enteredAmountIsValid && enteredAmountIsTouched;
  const enteredDateIsValid = (enteredDate !== null && (enteredDate).toString() !== 'Invalid Date');
  const enteredDateIsInvalid = ((enteredDate !== null && (enteredDate).toString() == 'Invalid Date') && enteredDateIsTouched) || enteredDate == null;
  let formIsValid = false;
  if (enteredAmountIsValid && enteredDateIsValid) {
    formIsValid = true;
  }

  const handleOpen = () => {
    setIsUpdate(false);
    resetForm();
    setOpen(true);
  };

  const resetForm = () => {
    setEnteredAmount("");
    setEnteredDate(new Date());
    setEnteredAmountIsTouched(false);
    setEnteredDateIsTouched(false);
  }

  const handleClose = () => {
    setOpen(false);
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

  const handleEdit = (salaryObj) => {
    setIsUpdate(prevState => true)
    setEnteredAmount(salaryObj.amount)
    setEnteredDate(new Date(salaryObj.date.split("-").reverse().join("-")))
    setOpen(true);
    setData(salaryObj);
  }

  const formHandler = (event) => {
    event.preventDefault();

    const obj = {
      amount: enteredAmount,
      date: moment(enteredDate).format("DD-MM-YYYY"),
      ...(isUpdate && { id: data.id })
    };

    props.addSalary({ obj, isUpdate });
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
              <span className="material-icons">{appStrings.add}</span> {appStrings.addSalary}
            </Button>
          </div>
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          <section className={expenseClasses.tableSection}>
            <Table rows={salaryRecord}
              columns={salaryGridColumn}
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
                  className={`${classes.modalTitle} ${expenseClasses.modalHeader}`}
                >
                  <h2 id="transition-modal-title">{appStrings.addSalary}</h2>
                </div>
                <div>
                  <form
                    onSubmit={formHandler}
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                  >
                    <Grid container>
                      <Grid item md={2} xs={12} sm={12}>
                        <label>{appStrings.amount} :</label>
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
                          <p className={'text-danger'}>
                            {appStrings.amountWarningTest}
                          </p>
                        )}
                      </Grid>
                      <Grid item md={2} xs={12} sm={12}>
                        <label>{appStrings.date} :</label>
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
                          <p className={'text-danger'}>
                            {appStrings.dateWarningText}
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
                          <span className="material-icons">{appStrings.saveIcon}</span> {appStrings.save}
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          type="button"
                          onClick={handleClose}
                          variant="contained"
                          color="secondary"
                        >
                          <span className="material-icons">{appStrings.closeIcon}</span> {appStrings.cancel}
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
                  <h2 id="transition-modal-title">{appStrings.deleteSalary}</h2>
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
                      onClick={deleteSalary}
                    >
                      <DeleteIcon /> {appStrings.delete}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => { setShowDeleteModal(false) }}
                      variant="contained"
                      color="secondary"
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
    tableRows: state.salary.salaries,
    isLoading: state.expense.isLoading
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    removeSalary: (id) => dispatch(removeSalary(id)),
    addSalary: (obj) => dispatch(addSalary(obj))
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(ManageSalary);