import React, { Fragment, useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from "react-redux";
import { errors } from "./AppConstants";
import { hideAlert } from "../store/expense-slice";

const AppAlert = ({ alert }) => {
    const [alertObj, setAlertObj] = useState(alert);
    const showError = useSelector((state) => state.expense.showError);
    const dispatch = useDispatch();

    useEffect(() => {
        setAlertObj(alert)
    }, [alert]);

    useEffect(() => {
        let timeout;
        if (showError) {
            setAlertObj({ show: true, type: 'error', message: errors['ERR_CONNECTION'] });
            timeout = setTimeout(() => {
                dispatch(hideAlert());
            }, 6000);
        }
        return () => {
            clearInterval(timeout);
        }
    }, [showError]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertObj(prevState => ({ ...prevState, show: false }));
    };

    return <Fragment>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={alertObj.show}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertObj.type}>
                {alertObj.message}
            </Alert>
        </Snackbar>
    </Fragment>
}

export default AppAlert;