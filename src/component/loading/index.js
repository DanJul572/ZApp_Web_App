'use client';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {useLoading} from '@/context/LoadingProvider';

const Loading = () => {
    const {loading} = useLoading();

    return (
        <Backdrop sx={{color: '#FFF', zIndex: theme => theme.zIndex.drawer + 1}} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loading;
