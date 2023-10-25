'use client';

import {useState} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Component from './component';
import Content from './content';
import Properties from './properties';
import TopBar from './topbar';

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
