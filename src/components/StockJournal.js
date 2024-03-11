import React, { useEffect } from "react";
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
import { addJournal, removeJournal } from "../store/journal-slice";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { appStrings, journalGridColumns } from "../common/AppConstants";
import PropTypes from "prop-types";

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
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
  }
}));

const ManageJournal = (props) => {
  const rows = props.tableRows;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [enteredDate, setEnteredDate] = React.useState(new Date());
  const [enteredStockName, setEnteredStockName] = React.useState("");
  const [enteredQuantity, setEnteredQuantity] = React.useState("");
  const [enteredEntryPrice, setEnteredEntryPrice] = React.useState("");
  const [enteredExitPrice, setEnteredExitPrice] = React.useState("");
  const [enteredProfitLostAmount, setEnteredProfitLostAmount] = React.useState("");
  const [enteredBreakdown, setEnteredBreakdown] = React.useState("");
  const [isProfit, setIsProfit] = React.useState(false);
  const [data, setData] = React.useState({});
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [journalRecord, setJournalRecord] = React.useState([]);
  let formIsValid = false;
  const isLoading = props.isLoading;

  useEffect(() => {
    if (!isLoading) {
      setOpen(false);
      setShowDeleteModal(false);
      setJournalRecord(rows)
    }
  }, [isLoading, rows]);

  const handleDelete = (journalObj) => {
    setShowDeleteModal(true);
    setData(journalObj);
  };

  const deleteJournal = () => {
    props.removeJournal(data.id);
  };

  const handleOpen = () => {
    setIsUpdate(false);
    resetForm();
    setOpen(true);
  };

  const resetForm = () => {
    setEnteredDate(new Date());
    setEnteredBreakdown("");
    setEnteredEntryPrice("");
    setEnteredExitPrice("");
    setIsProfit("");
    setEnteredProfitLostAmount("");
    setEnteredQuantity("");
    setEnteredStockName("");
  }

  const handleEdit = (journalObj) => {
    setIsUpdate(prevState => true)
    setEnteredDate(new Date(journalObj.date.split("-").reverse().join("-")));
    setEnteredBreakdown(journalObj.breakdown);
    setEnteredEntryPrice(journalObj.entryPrice);
    setEnteredExitPrice(journalObj.exitPrice);
    setIsProfit(journalObj.isProfit);
    setEnteredProfitLostAmount(journalObj.profitLoss);
    setEnteredQuantity(journalObj.quantity);
    setEnteredStockName(journalObj.stockName);
    setOpen(true);
    setData(journalObj);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (event, field) => {
    if (field === "date") {
      setEnteredDate(event);
    }
    if (field === "name") {
      setEnteredStockName(event.target.value);
    }
    if (field === "quantity") {
      setEnteredQuantity(Number(event.target.value));
    }
    if (field === "entryPrice") {
      setEnteredEntryPrice(Number(event.target.value));
    }
    if (field === "exitPrice") {
      let exitPrice = Number(event.target.value)
      setEnteredExitPrice(exitPrice);
      let totalEntryPrice = enteredEntryPrice * enteredQuantity;
      let totalExitPrice = exitPrice * enteredQuantity;
      setEnteredProfitLostAmount(totalExitPrice - totalEntryPrice);
      setIsProfit(exitPrice > enteredEntryPrice)
    }
    if (field === "breakdown") {
      setEnteredBreakdown(Number(event.target.value));
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
    const obj = {
      stockName: enteredStockName,
      quantity: enteredQuantity,
      entryPrice: enteredEntryPrice,
      exitPrice: enteredExitPrice,
      profitLoss: enteredProfitLostAmount,
      breakdown: enteredBreakdown,
      date: moment(enteredDate).format("DD-MM-YYYY"),
      isProfit: isProfit,
      ...(isUpdate && { id: data.id })
    };
    props.addJournal({ obj, isUpdate });
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
              <span className="material-icons">{appStrings.add}</span> {appStrings.addJournal}
            </Button>
          </div>
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          <section className={expenseClasses.tableSection}>
            <Table rows={journalRecord} columns={journalGridColumns}
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
                  <h2 id="transition-modal-title">{!isUpdate ? appStrings.addJournal : appStrings.updateJournal}</h2>
                </div>
                <div>
                  <form
                    onSubmit={formHandler}
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                  >
                    <Grid container
                      className={classes.formContainer}
                    >
                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date"
                              label="Date"
                              format="MM/dd/yyyy"
                              onChange={(e) => changeHandler(e, "date")}
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
                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="Stock Name"
                          id="name"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "name")}
                          value={enteredStockName}
                        />
                      </Grid>
                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="Quantity"
                          id="quantity"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "quantity")}
                          value={enteredQuantity}
                          type="number"
                          min="1"
                        />
                      </Grid>

                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="Entry Price"
                          id="entryPrice"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "entryPrice")}
                          value={enteredEntryPrice}
                          type="number"
                          min="1"
                        />
                      </Grid>

                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="Exit Price"
                          id="exitPrice"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "exitPrice")}
                          value={enteredExitPrice}
                          type="number"
                          min="1"
                        />
                      </Grid>

                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="Profit/Lost"
                          id="profitLost"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "profitLost")}
                          value={enteredProfitLostAmount}
                          type="number"
                          min="1"
                          disabled={true}
                        />
                      </Grid>

                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="Breakdown"
                          id="breakdown"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "breakdown")}
                          value={enteredBreakdown}
                          type="number"
                          min="1"
                        />
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={1}>
                      <Grid item md={6} xs={2}></Grid>
                      <Grid
                        item
                        md={6}
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
                          <span className="material-icons">{appStrings.saveIcon}</span>
                          {appStrings.save}
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
                  <h2 id="transition-modal-title">{appStrings.deleteJournal}</h2>
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
                  <Grid item md={6} xs={2}></Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    sm={12}
                    className={classes.modalActions}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={deleteJournal}
                    >
                      <DeleteIcon /> {appStrings.delete}
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => { setShowDeleteModal(false) }}
                    >
                      <span className="material-icons">{appStrings.close}</span> {appStrings.cancel}
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
    tableRows: state.journal.journals,
    isLoading: state.journal.isLoading
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    removeJournal: (id) => dispatch(removeJournal(id)),
    addJournal: (obj) => dispatch(addJournal(obj))
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(ManageJournal);

ManageJournal.propTypes = {
  removeJournal: PropTypes.func,
  addJournal: PropTypes.func,
  tableRows: PropTypes.array,
  isLoading: PropTypes.bool,
}