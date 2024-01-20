/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({
    alerting,
    message,
    severity
}) => {
    const [state, setState] = React.useState({
        open: alerting,
        Transition: Slide
    });

    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setState({
            ...state,
            open: false,
        });
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <div>
            {alerting && <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={alerting}
                onClose={handleClose}
                autoHideDuration={2000}
                TransitionComponent={state.Transition}
                key={state.Transition.name}
            >
                <Alert severity={severity} sx={{ width: '100%' }} onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>}
        </div>
    );
};

export default Toast;
