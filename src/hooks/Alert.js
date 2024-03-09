import {useAlert} from '@/context/AlertProvider';

const Alert = () => {
    const {setAlert} = useAlert();

    const showSuccessAlert = message => {
        setAlert({
            status: true,
            type: 'success',
            message: message,
        });
    };

    const showErrorAlert = message => {
        setAlert({
            status: true,
            type: 'error',
            message: message,
        });
    };

    const showWarningAlert = message => {
        setAlert({
            status: true,
            type: 'warning',
            message: message,
        });
    };

    const showInfoAlert = message => {
        setAlert({
            status: true,
            type: 'indo',
            message: message,
        });
    };

    const hideAlert = () => {
        setAlert(false);
    };

    return {
        showSuccessAlert,
        showErrorAlert,
        showWarningAlert,
        showInfoAlert,
        hideAlert,
    };
};

export default Alert;
