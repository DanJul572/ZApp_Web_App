'use client';

import {Box, Grid} from '@mui/material';
import Component from './component';
import TopBar from './topbar';
import Content from './content';
import Properties from './properties';

const ViewCreate = () => {
    return (
        <Box>
            <TopBar />
            <Grid container>
                <Component />
                <Content />
                <Properties />
            </Grid>
        </Box>
    );
};

export default ViewCreate;
