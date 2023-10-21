'use client';

import {useState} from 'react';
import {Box, Grid} from '@mui/material';
import Component from './component';
import TopBar from './topbar';
import Content from './content';
import Properties from './properties';

const ViewCreate = () => {
    const [content, setContent] = useState([]);

    return (
        <Box>
            <TopBar />
            <Grid container>
                <Component content={content} setContent={setContent} />
                <Content content={content} />
                <Properties />
            </Grid>
        </Box>
    );
};

export default ViewCreate;
