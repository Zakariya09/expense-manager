import React, { Fragment, useState } from "react";
import MainNavigation from "../Layout/MainNavigation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 60,
    padding: "25px",
  },
  bg: {
    height: '92.6vh',
    marginTop: '0px',
    background: '#780206',
    background: '-webkit-linear-gradient(to left, #061161, #780206)',
    // background: 'linear-gradient(to left, #061161, #780206)',
    background: 'linear-gradient(to left, #780206, #061161)',
  }
}));

const Layout = (props) => {
  const classes = useStyles();

  function showGradient(path) {
    return path == '/login' || path == '/';
  }
  return (
    <Fragment>
      <MainNavigation />
      <main className={`${classes.content} ${showGradient(window.location.pathname) ? classes.bg : undefined}`}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
