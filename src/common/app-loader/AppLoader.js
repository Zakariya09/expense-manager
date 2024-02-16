import React, { Fragment, useEffect, useState } from "react"
import './AppLoader.css'
import { useSelector } from "react-redux";

const AppLoader = () => {
    const [showLoader, setShowLoader] = useState();
    const isLoading = useSelector((state) => state.expense.isLoading);

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