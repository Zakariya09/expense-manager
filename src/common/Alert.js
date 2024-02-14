import React, { Fragment, useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const AppAlert = ({ alert }) => {
    const [alertObj, setAlertObj] = useState(alert);

    useEffect(() => {
        setAlertObj(alert)
    }, [alert]);

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
            <Alert onClose={handleClose} severity={alert.type}>
                {alertObj.message}
            </Alert>
        </Snackbar>
    </Fragment>
}

export default AppAlert;