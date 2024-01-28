import ThemeProvider from '@mui/material/styles/ThemeProvider';

import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';

import {LoadingProvider} from '@/context/LoadingProvider';

import Loading from '@/component/loading';

import CTheme from '@/constant/CTheme';

const Empty = props => {
    const theme = createTheme(CTheme);

    const {children} = props;

    return (
        <ThemeProvider theme={theme}>
            <LoadingProvider>
                <Loading />
                {children}
            </LoadingProvider>
            <CssBaseline />
        </ThemeProvider>
    );
};

export default Empty;
