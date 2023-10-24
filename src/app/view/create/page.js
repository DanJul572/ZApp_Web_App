'use client';

import {useState} from 'react';
import {Box, Grid} from '@mui/material';
import Component from './component';
import TopBar from './topbar';
import Content from './content';
import Properties from './properties';

const ViewCreate = () => {
    const [content, setContent] = useState([]);
    const [selected, setSelected] = useState(null);

    return (
        <Box>
            <TopBar />
            <Grid container>
                <Component content={content} setContent={setContent} setSelected={setSelected} />
                <Content content={content} selected={selected} setSelected={setSelected} />
                <Properties selected={selected} content={content} setContent={setContent} setSelected={setSelected} />
            </Grid>
        </Box>
    );
};

export default ViewCreate;
