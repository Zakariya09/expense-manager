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
import { addJournal, removeJournal } from "../store/journal-slice";
import moment from "moment";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

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
}));

function createData(name, amount, date) {
  return { name, amount, date };
}

// const rows = [
//   { id: "12", name: "Grocery", amount: "1200", date: "15-08-2021" },
// ];
const columns = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "stockName", label: "Stock Name", minWidth: 100 },
  { id: "entryPrice", label: "Entry Price", minWidth: 10 },
  { id: "exitPrice", label: "Exit Price", minWidth: 10 },
  { id: "quantity", label: "Quantity", minWidth: 10 },
  { id: "profitLoss", label: "Profit/Loss", minWidth: 10 },
  { id: "breakdown", label: "Breakdown", minWidth: 10 },
  { id: "Actions", label: "Actions", minWidth: 10 },
];

const ManageJournal = () => {
  const rows = useSelector((state) => state.journal.journals);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [enteredDate, setEnteredDate] = React.useState(new Date());
  const [enteredStockName, setEnteredStockName] = React.useState("");
  const [enteredQuantity, setEnteredQuantity] = React.useState("");
  const [enteredEntryPrice, setEnteredEntryPrice] = React.useState("");
  const [enteredExitPrice, setEnteredExitPrice] = React.useState("");
  const [enteredProfitLostAmount, setEnteredProfitLostAmount] = React.useState("");
  const [enteredBreakdown, setEnteredBreakdown] = React.useState("");
  const [isProfit, setIsProfit] = React.useState(false);

  const [data, setData] = React.useState({});
  const dispatch = useDispatch();
  const [] = useReducer();

  const handleDelete = (expenseObj) => {
    setShowDeleteModal(true);
    setData(expenseObj);
  };
  const deleteExpense = () => {
    dispatch(removeJournal(data.id));
  };

  let formIsValid = false;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

  const changeHandler = (event, field) => {
    if(field === "date"){
        setEnteredDate(event);
    }
    if(field === "name"){
        setEnteredStockName(event.target.value);
    }
    if(field === "quantity"){
        setEnteredQuantity(Number(event.target.value));
    }
    if(field === "entryPrice"){
        setEnteredEntryPrice(Number(event.target.value));
    }
    if(field === "exitPrice"){
        let exitPrice = Number(event.target.value)
        setEnteredExitPrice(exitPrice);
         let totalEntryPrice = enteredEntryPrice * enteredQuantity;
         let totalExitPrice = exitPrice *  enteredQuantity;
        setEnteredProfitLostAmount(totalExitPrice - totalEntryPrice);
        setIsProfit(exitPrice > enteredEntryPrice)
    }
    if(field === "breakdown"){
        setEnteredBreakdown(Number(event.target.value));
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
   
    const obj = {
        stockName:enteredStockName,
        quantity:enteredQuantity,
        entryPrice:enteredEntryPrice,
        exitPrice:enteredExitPrice,
        profitLoss:enteredProfitLostAmount,
        breakdown: enteredBreakdown,
        date: moment(enteredDate).format("DD-MM-YYYY"),
        isProfit: isProfit
    };
    dispatch(addJournal(obj));

    setEnteredProfitLostAmount("");
    setEnteredDate(new Date());
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
              <span className="material-icons">add</span> Add Journal
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
                  <h2 id="transition-modal-title">Add Journal</h2>
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
                      <Grid item md={6} lg={6} xs={8}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date"
                              label="Date"
                              format="MM/dd/yyyy"
                              onChange={(e)=>changeHandler(e, "date")}
                              style={{ width: "100%" }}
                              variant="outlined"
                              value={enteredDate}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Grid>
                    <Grid item md={6} lg={6} xs={12} sm={12}>
                        <TextField
                          label="Stock Name"
                          id="name"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e)=>changeHandler(e, "name")}
                          value={enteredStockName}
                        />
                      </Grid>
                      <Grid item md={6} lg={6} xs={12} sm={12}>
                        <TextField
                          label="Quantity"
                          id="quantity"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                         onChange={(e)=>changeHandler(e, "quantity")}
                          value={enteredQuantity}
                          type="number"
                          min="1"
                        />
                      </Grid>

                      <Grid item md={6} lg={6} xs={12} sm={12}>
                        <TextField
                          label="Entry Price"
                          id="entryPrice"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e)=>changeHandler(e, "entryPrice")}
                          value={enteredEntryPrice}
                          type="number"
                          min="1"
                        />
                      </Grid>

                      <Grid item md={6} lg={6} xs={12} sm={12}>
                        <TextField
                          label="Exit Price"
                          id="exitPrice"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e)=>changeHandler(e, "exitPrice")}
                          value={enteredExitPrice}
                          type="number"
                          min="1"
                        />
                      </Grid>

                      <Grid item md={6} lg={6} xs={12} sm={12}>
                        <TextField
                          label="Profit/Lost"
                          id="profitLost"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e)=>changeHandler(e, "profitLost")}
                          value={enteredProfitLostAmount}
                          type="number"
                          min="1"
                          disabled={true}
                        />
                      </Grid>

                      <Grid item md={6} lg={6} xs={12} sm={12}>
                        <TextField
                          label="Breakdown"
                          id="breakdown"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e)=>changeHandler(e, "breakdown")}
                          value={enteredBreakdown}
                          type="number"
                          min="1"
                        />
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
                          disabled={formIsValid}
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

export default ManageJournal;
