'use client';

import {useState} from 'react';

import Grid from '@mui/material/Grid';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import CTheme from '@/constant/CTheme';

import Component from './component';
import Content from './content';
import Function from './function';
import Navigation from './navigation';
import Properties from './properties';
import TopBar from './topbar';

const ViewCreate = () => {
    const theme = createTheme(CTheme);

    const navigationType = {
        content: 'content',
        variabel: 'variabel',
        function: 'function',
        module: 'module',
    };

    const [content, setContent] = useState([]);
    const [selected, setSelected] = useState(null);
    const [activeNavigation, setActiveNavigation] = useState(navigationType.content);

    const activeContent = () => {
        if (activeNavigation === navigationType.content)
            return <Content content={content} selected={selected} setSelected={setSelected} />;

        if (activeNavigation === navigationType.function) return <Function />;
    };

    return (
        <ThemeProvider theme={theme}>
            <TopBar content={content} setContent={setContent} />
            <Grid container justifyContent="space-between" display="flex">
                <Component content={content} setContent={setContent} setSelected={setSelected} />
                <Navigation
                    activeNavigation={activeNavigation}
                    navigationType={navigationType}
                    setActiveNavigation={setActiveNavigation}
                />
                {activeContent()}
                <Properties
                    activeNavigation={activeNavigation}
                    content={content}
                    navigationType={navigationType}
                    selected={selected}
                    setContent={setContent}
                    setSelected={setSelected}
                />
            </Grid>
        </ThemeProvider>
    );
};

export default ViewCreate;
