import React, { Fragment, useState } from "react";
import MainNavigation from "../Layout/MainNavigation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 60,
    padding: "25px",
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
