import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import { FormHelperText, Button, Divider, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    "& > *": {
      margin: theme.spacing(1),
    },
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
  cardWidth: {
    width: "30%",
  },
  alignCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  mtTop: {
    marginTop: "10%",
  },
  maxWidth: {
    width: "80%",
    margin: "0.8rem",
  },
  alignCard: {
    textAlign: "center",
    marginTop: "5%",
  },
}));

const Auth = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const history = useHistory();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const userObj = {
      name,
      password,
    };

    let response = dispatch({ type: "login", data: userObj });
    console.log("response");
    console.log(response);
    history.replace("/manageExpense");
  };
  return (
    <Fragment>
      <div className={`${classes.alignCenter} ${classes.mtTop} `}>
        <Card className={`${classes.root} ${classes.cardWidth} `}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              className={classes.alignCenter}
            >
              Login
            </Typography>
            <Divider className={classes.mtTop}></Divider>

            <form onSubmit={submitHandler} className={classes.alignCard}>
              <FormControl className={classes.maxWidth}>
                <TextField
                  variant="outlined"
                  label="Username"
                  size="small"
                  type="text"
                  name="username"
                  onChange={nameChangeHandler}
                  value={name}
                />
                {emailIsInvalid && (
                  <FormHelperText id="my-helper-text">
                    Please enter the correct username.
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl className={classes.maxWidth}>
                <TextField
                  id="password"
                  variant="outlined"
                  label="Password"
                  size="small"
                  type="password"
                  name="password"
                  onChange={passwordChangeHandler}
                  value={password}
                />
                {passwordIsInvalid && (
                  <FormHelperText id="password">
                    Please enter the correct password.
                  </FormHelperText>
                )}
              </FormControl>
              <CardActions className={classes.alignCenter}>
                <div className={classes.root}>
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </div>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};
export default Auth;
