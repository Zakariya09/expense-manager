import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import React, { Component } from "react";
import AppAlert from "../common/Alert";
import AppLoader from "../common/app-loader/AppLoader";
const Root = () => {

    return (
        <Layout>
            <AppLoader />
            <AppAlert alert={{}} />
            <Outlet />
        </Layout>
    )
}

export default Root;