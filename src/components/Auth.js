import React from "react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import { FormHelperText, Button, Divider, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { loggedIn, logout } from "../store/auth-slice";

import AppAlert from "../common/Alert";
import { appStrings, errors, loginpUrl, signupUrl } from "../common/AppConstants";
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
  action: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      width: '81%'
    },
    '& p:hover': {
      color: 'blue',
      fontWeight: '500',
      cursor: 'pointer',
      textDecoration: 'underline',
    }
  },
  gradientFont: {
    background: 'linear-gradient(to right, #780206, #061161)',
    backgroundClip: 'text',
    '-webkitTextFillColor': 'transparent',
    fontSize: '2rem',
    fontWeight: '600',
  },
  mtTop5: {
    marginTop: "5%",
    background: 'linear-gradient(to right, #780206, #061161)',
  }
}));

const Auth = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const userObj = {
      userName,
      password,
      isSignup
    };

    await fetch(isSignup ? signupUrl : loginpUrl, {
      method: "POST",
      body: JSON.stringify({
        email: userName,
        password,
        returnSecureToken: true
      })
    }).then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        dispatch(loggedIn(userObj));
        localStorage.setItem("userObject", JSON.stringify(userObj));
        navigate("/manage-expense");
      } else {
        setAlert(prevState => ({ show: true, type: 'error', message: errors[data.error.message] }));
      }
    }).catch((error) => {
      setAlert(prevState => ({ show: true, type: 'error', message: errors['ERR_CONNECTION'] }));
    });
  };

  return (
    <Fragment>
      <div className={`${classes.alignCenter} ${classes.mtTop}`}>
        <Card className={`${classes.root} ${classes.cardWidth}`}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              className={`${classes.alignCenter} ${classes.gradientFont}`}
            >
              {appStrings.appName}
            </Typography>
            <Divider className={classes.mtTop5}></Divider>
            <form
              onSubmit={submitHandler}
              className={classes.alignCard}
              name="loginForm"
            >
              <FormControl className={classes.maxWidth}>
                <TextField
                  variant="outlined"
                  label="Username"
                  size="small"
                  type="text"
                  name="userName"
                  onChange={nameChangeHandler}
                  value={userName}
                  required
                />
                {emailIsInvalid && (
                  <FormHelperText id="my-helper-text">
                    {appStrings.usernameWarningText}
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
                  required
                />
                {passwordIsInvalid && (
                  <FormHelperText id="password">
                    {appStrings.passwordWarningText}
                  </FormHelperText>
                )}
              </FormControl>
              <CardActions className={classes.alignCenter}>
                <div className={`${classes.root} ${classes.action}`}>
                  <Button type="submit" variant="contained" color="primary">
                    {isSignup ? `${appStrings.signup}` : `${appStrings.login}`}
                  </Button>
                  <FormHelperText id="my-helper-text" onClick={() => { setIsSignup(!isSignup) }}>
                    {isSignup ? `${appStrings.existingUserText}` : `${appStrings.signupUserText}`}
                  </FormHelperText>
                </div>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </div>
      <AppAlert alert={alert} />
    </Fragment>
  );
};
export default Auth;
