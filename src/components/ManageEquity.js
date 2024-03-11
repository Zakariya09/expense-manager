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
import Table from "../common/Table";
import { Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { addEquity, removeEquity } from "../store/equity-slice";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { appStrings, equityGridColumns } from "../common/AppConstants";
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
      color: "red",
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

const ManageEquity = (props) => {
  const rows = props.tableRows;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [enteredStockName, setEnteredStockName] = React.useState("");
  const [enteredEntryPrice, setEnteredEntryPrice] = React.useState("");
  const [enteredTargetPrice, setEnteredTargetPrice] = React.useState("");
  const [enteredDebtPercent, setEnteredDebtPercent] = React.useState("");
  const [enteredATH, setEnteredATH] = React.useState("");
  const [enteredATL, setEnteredATL] = React.useState("");
  const isLoading = props.isLoading;
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [equityRecords, setEquityRecord] = React.useState([]);

  const [data, setData] = React.useState({});
  const dispatch = useDispatch();
  const [] = useReducer();

  useEffect(() => {
    if (!isLoading) {
      setOpen(false);
      setShowDeleteModal(false);
      setEquityRecord(rows)
    }
  }, [isLoading, rows]);

  const handleDelete = (equityObj) => {
    setShowDeleteModal(true);
    setData(equityObj);
  };

  const handleEdit = (equityObj) => {
    setIsUpdate(prevState => true);
    console.log('equityObj')
    console.log(equityObj)
    setData(equityObj);
    setEnteredATH(equityObj.allTimeHigh);
    setEnteredATL(equityObj.allTimeLow);
    setEnteredDebtPercent(equityObj.debtPercent);
    setEnteredEntryPrice(equityObj.entryPrice);
    setEnteredStockName(equityObj.stockName);
    setEnteredTargetPrice(equityObj.target);
    setOpen(true);
  };

  const resetForm = () => {
    setEnteredATH('');
    setEnteredATL('');
    setEnteredDebtPercent('');
    setEnteredEntryPrice('');
    setEnteredStockName('');
    setEnteredTargetPrice('');
  }


  const deleteEquity = () => {
    props.removeEquity(data.id)
    handleDeleteClose();
  };

  let formIsValid = false;
  const handleOpen = () => {
    setIsUpdate(false);
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

  const changeHandler = (event, field) => {

    if (field === "name") {
      setEnteredStockName(event.target.value);
    }

    if (field === "entryPrice") {
      setEnteredEntryPrice(Number(event.target.value));
    }
    if (field === "target") {
      setEnteredTargetPrice(Number(event.target.value));
    }
    if (field === "debtPercent") {
      setEnteredDebtPercent(Number(event.target.value));
    }
    if (field === "allTimeHigh") {
      setEnteredATH(Number(event.target.value));
    }
    if (field === "allTimeLow") {
      setEnteredATL(Number(event.target.value));
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
    const obj = {
      stockName: enteredStockName,
      entryPrice: enteredEntryPrice,
      target: enteredTargetPrice,
      debtPercent: enteredDebtPercent,
      allTimeHigh: enteredATH,
      allTimeLow: enteredATL,
      ...(isUpdate && { id: data.id })
    };
    console.log("obj")
    console.log(obj)
    props.addEquity({ obj, isUpdate });
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
              <span className="material-icons">{appStrings.add}</span> {appStrings.addEquity}
            </Button>
          </div>
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          <section className={expenseClasses.tableSection}>
            <Table rows={equityRecords}
              columns={equityGridColumns}
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
                  <h2 id="transition-modal-title">{!isUpdate ? appStrings.addEquity : appStrings.updateEquity}</h2>
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
                          label="Target Price"
                          id="target"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "target")}
                          value={enteredTargetPrice}
                          type="number"
                          min="1"
                        />
                      </Grid>

                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="Debt in %"
                          id="debtPercent"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "debtPercent")}
                          value={enteredDebtPercent}
                          type="number"
                          min="1"
                        />
                      </Grid>

                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="All Time High"
                          id="allTimeHigh"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "allTimeHigh")}
                          value={enteredATH}
                          type="number"
                          min="1"
                        />
                      </Grid>
                      <Grid item md={5} lg={5} xs={12} sm={12}>
                        <TextField
                          label="All Time Low"
                          id="allTimeLow"
                          variant="outlined"
                          size="small"
                          style={{ width: "100%" }}
                          onChange={(e) => changeHandler(e, "allTimeLow")}
                          value={enteredATL}
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
                  <h2 id="transition-modal-title">{appStrings.deleteEquity}</h2>
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
                      onClick={deleteEquity}
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
    tableRows: state.equity.equities,
    isLoading: state.equity.isLoading
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    removeEquity: (id) => dispatch(removeEquity(id)),
    addEquity: (obj) => dispatch(addEquity(obj))
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(ManageEquity);

ManageEquity.propTypes = {
  removeEquity: PropTypes.func,
  addEquity: PropTypes.func,
  tableRows: PropTypes.array,
  isLoading: PropTypes.bool,
}
