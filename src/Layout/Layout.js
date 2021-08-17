import React, { Fragment, useState } from "react";
import MainNavigation from "../Layout/MainNavigation";
import SideMenu from "../Layout/SideMenu";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation  />
      <main style={{}}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
