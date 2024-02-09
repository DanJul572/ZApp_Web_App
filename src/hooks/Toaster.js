import {useToast} from '@/context/ToastProvider';

const Toaster = () => {
    const {setToast} = useToast();

    const showSuccessToast = message => {
        setToast({
            status: true,
            type: 'success',
            message: message,
        });
    };

    const showErrorToast = message => {
        setToast({
            status: true,
            type: 'error',
            message: message,
        });
    };

    const showWarningToast = message => {
        setToast({
            status: true,
            type: 'warning',
            message: message,
        });
    };

    const showInfoToast = message => {
        setToast({
            status: true,
            type: 'indo',
            message: message,
        });
    };

    return {
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
    };
};

export default Toaster;
