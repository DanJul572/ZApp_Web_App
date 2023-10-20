'use client';

import {Box, Grid, Typography, colors} from '@mui/material';
import Component from './component';

const ViewCreate = () => {
    return (
        <Box>
            <Grid container marginBottom={1}></Grid>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    border={1}
                    borderBottom={0}
                    borderColor={colors.grey[400]}
                    padding={2}>
                    <Typography>NAVIGATION</Typography>
                </Grid>
                <Grid item xs={2} border={1} borderRight={0} borderColor={colors.grey[400]}>
                    <Component />
                </Grid>
                <Grid item xs={10} border={1} borderColor={colors.grey[400]}></Grid>
            </Grid>
        </Box>
    );
};

export default ViewCreate;
