import React, { Fragment, useEffect, useState } from "react"
import './AppLoader.css'
import { useSelector } from "react-redux";

const AppLoader = () => {
    const [showLoader, setShowLoader] = useState();
    let    isLoading = useSelector((state) => state.expense.isLoading)
    // if (document.URL.includes('manage-expense')) {
    //     isLoading = useSelector((state) => state.expense.isLoading);
    // } else if (document.URL.includes('manage-income')) {
    //     isLoading = useSelector((state) => state.salary.isLoading);
    // }
    useEffect(() => {
        setShowLoader(isLoading);
    }, [isLoading]);

    return <Fragment>
        {showLoader && <div className="modal-overlay" >
            <div className="loader"></div>
        </div>}
    </Fragment>
}

export default AppLoader;