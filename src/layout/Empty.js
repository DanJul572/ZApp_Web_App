import ThemeProvider from '@mui/material/styles/ThemeProvider';

import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';

import {LoadingProvider} from '@/context/LoadingProvider';
import {ToastProvider} from '@/context/ToastProvider';

import Loading from '@/component/loading';
import Toast from '@/component/toast';

import CTheme from '@/constant/CTheme';

const Empty = ({children}) => {
    const theme = createTheme(CTheme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LoadingProvider>
                <ToastProvider>
                    <Loading />
                    <Toast />
                    {children}
                </ToastProvider>
            </LoadingProvider>
        </ThemeProvider>
    );
};

export default Empty;
