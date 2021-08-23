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
  alignText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "30px",
  },
});

const HalalCheck = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Fragment>
      <Card className={`${classes.root} ${classes.margin5}`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Debt Threshold
          </Typography>
          <Divider></Divider>
          <form>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="my-input">Total Debt.</InputLabel>
                    <Input
                      id="my-input"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="my-input">Total Liablities</InputLabel>
                    <Input
                      id="my-input"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12}>
                  <Button variant="contained" size="small" color="primary">
                    Calculate
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <Typography
                    variant="h2"
                    component="h2"
                    className={classes.alignText}
                  >
                    5%
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
          <form>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="totalIncome">Total Income</InputLabel>
                    <Input
                      id="totalIncome"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>
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
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12}>
                  <Button variant="contained" size="small" color="primary">
                    Calculate
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <Typography
                    variant="h2"
                    component="h2"
                    className={classes.alignText}
                  >
                    5%
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
          <form>
            <Grid container>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <FormControl>
                    <InputLabel htmlFor="totalAssets">Total Assets</InputLabel>
                    <Input
                      id="totalAssets"
                      aria-describedby="my-helper-text"
                      className={classes.margin5}
                      type="number"
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>
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
                    />
                    {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item md={12} sm={12}>
                  <Button variant="contained" size="small" color="primary">
                    Calculate
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid item md={12} sm={12}>
                  <Typography
                    variant="h2"
                    component="h2"
                    className={classes.alignText}
                  >
                    5%
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
