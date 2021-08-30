import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Grid,
  Divider,
} from "@material-ui/core";

import { useState } from "react";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin5: {
    margin: "5px",
  },
  alignText: {},
  textDanger: {
    color: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "30px",
  },
  textSuccess: {
    color: "green",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "30px",
  },
  resultTextDanger: {
    color: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "0px",
  },
  resultTextSuccess: {
    color: "green",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "0px",
  },
});

const HalalCheck = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [totalDebt, setTotalDebt] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [debthreshold, setDebthreshold] = useState(0);

  const [totalAssets, setTotalAssets] = useState(0);
  const [cashRatio, setCashRatio] = useState(0);
  const [liquidityThreshold, setLiquidityThreshold] = useState(0);

  const [totalIncome, setTotalIncome] = useState(0);
  const [interestIncome, setInterestIncome] = useState(0);
  const [interestThreshold, setInterestThreshold] = useState(0);

  const totalDebtChangeHandler = (event) => {
    setTotalDebt(event.target.value);
  };
  const totalLiablitiesChangeHandler = (event) => {
    setTotalLiabilities(event.target.value);
  };
  const debtThresholdHandler = (event) => {
    event.preventDefault();
    let debthreshold = (totalDebt / totalLiabilities) * 100;
    isNaN(debthreshold)
      ? setDebthreshold(0)
      : setDebthreshold(debthreshold.toFixed(2));
  };

  const totalIncomeChangeHandler = (event) => {
    setTotalIncome(event.target.value);
  };
  const interestIncomeChangeHandler = (event) => {
    setInterestIncome(event.target.value);
  };
  const interestThresholdHandler = (event) => {
    event.preventDefault();
    let interestThreshold = (interestIncome / totalIncome) * 100;
    isNaN(interestThreshold)
      ? setInterestThreshold(0)
      : setInterestThreshold(interestThreshold.toFixed(2));
  };

  const cashRatioChangeHandler = (event) => {
    setCashRatio(event.target.value);
  };
  const totalAssetsChangeHandler = (event) => {
    setTotalAssets(event.target.value);
  };
  const liquidityThresholdSubmitHandler = (event) => {
    event.preventDefault();
    let liquidityThreshold = (cashRatio / totalAssets) * 100;
    isNaN(liquidityThreshold)
      ? setLiquidityThreshold(0)
      : setLiquidityThreshold(liquidityThreshold.toFixed(2));
  };

  return (
    <Fragment>
      <Card className={`${classes.root} ${classes.margin5}`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Debt Threshold
          </Typography>
          <Divider></Divider>
          <form onSubmit={debtThresholdHandler}>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="totalDebt">Total Debt.</InputLabel>
                    <Input
                      id="totalDebt"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                      value={totalDebt}
                      onChange={totalDebtChangeHandler}
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="totalLiabilities">
                      Total Liablities
                    </InputLabel>
                    <Input
                      id="totalLiabilities"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                      value={totalLiabilities}
                      onChange={totalLiablitiesChangeHandler}
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    Calculate
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={
                      debthreshold > 33
                        ? classes.textDanger
                        : classes.textSuccess
                    }
                  >
                    {debthreshold}%
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    className={
                      debthreshold > 33
                        ? classes.resultTextDanger
                        : classes.resultTextSuccess
                    }
                  >
                    {debthreshold > 33 ? "Fail" : "Pass"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card className={`${classes.root} ${classes.margin5}`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Interest Threshold
          </Typography>
          <Divider></Divider>
          <form onSubmit={interestThresholdHandler}>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="interestIncome">
                      Interest Income
                    </InputLabel>
                    <Input
                      id="interestIncome"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                      value={interestIncome}
                      onChange={interestIncomeChangeHandler}
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>

                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="totalIncome">Total Income</InputLabel>
                    <Input
                      id="totalIncome"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                      value={totalIncome}
                      onChange={totalIncomeChangeHandler}
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>

                <Grid item md={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    Calculate
                  </Button>
                </Grid>
              </Grid>

              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={
                      interestThreshold > 5
                        ? classes.textDanger
                        : classes.textSuccess
                    }
                  >
                    {interestThreshold}%
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    className={
                      interestThreshold > 5
                        ? classes.resultTextDanger
                        : classes.resultTextSuccess
                    }
                  >
                    {interestThreshold > 5 ? "Fail" : "Pass"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card className={`${classes.root} ${classes.margin5}`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Liquidity Threshold
          </Typography>
          <Divider></Divider>
          <form onSubmit={liquidityThresholdSubmitHandler}>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="currentRatio">
                      Current Ratio
                    </InputLabel>
                    <Input
                      id="currentRatio"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                      value={cashRatio}
                      onChange={cashRatioChangeHandler}
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>

                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="totalAssets">Total Assets</InputLabel>
                    <Input
                      id="totalAssets"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                      value={totalAssets}
                      onChange={totalAssetsChangeHandler}
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>

                <Grid item md={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    Calculate
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={
                      liquidityThreshold > 33
                        ? classes.textDanger
                        : classes.textSuccess
                    }
                  >
                    {liquidityThreshold}%
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    className={
                      liquidityThreshold > 33
                        ? classes.resultTextDanger
                        : classes.resultTextSuccess
                    }
                  >
                    {liquidityThreshold > 33 ? "Fail" : "Pass"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Fragment>
  );
};
export default HalalCheck;
