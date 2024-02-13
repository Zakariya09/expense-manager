import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import React, { Component } from "react";
const Root = () => {

    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default Root;