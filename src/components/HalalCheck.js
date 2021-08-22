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
});

const HalalCheck = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Fragment>
      <Card className={classes.root}>
        <CardContent>
        <Typography variant="h4" component="h2">
        Total Debt % Check
        </Typography>
          <form>
            <Grid container>
              <Grid item md={12} sm={12}>
                <FormControl>
                  <InputLabel htmlFor="my-input">Total Debt.</InputLabel>
                  <Input id="my-input" aria-describedby="my-helper-text" />
                  {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item md={12} sm={12}>
                <FormControl>
                  <InputLabel htmlFor="my-input">Total Liablities</InputLabel>
                  <Input id="my-input" aria-describedby="my-helper-text" />
                  {/* <FormHelperText id="my-helper-text">
                    We'll never share your email.
                  </FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item md={12} sm={12}>
                <Button variant="contained" color="primary">
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};
export default HalalCheck;
