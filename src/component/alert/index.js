'use client';

import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@/alias/MuiAlert';

import {useAlert} from '@/context/AlertProvider';

const Alert = () => {
    const {alert, setAlert} = useAlert();

    const renderAlert = () => {
        if (!alert || !alert.status) return false;

        return (
            <MuiAlert
                severity={alert.type || 'success'}
                action={
                    <IconButton color="inherit" size="small" onClick={() => setAlert(false)}>
                        <Close fontSize="small" />
                    </IconButton>
                }
                sx={{mb: 2}}>
                {alert.message || 'Process is success.'}
            </MuiAlert>
        );
    };

    return renderAlert();
};

export default Alert;
