'use client';

import {useState} from 'react';
import {useSearchParams} from 'next/navigation';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import {LoadingProvider} from '@/context/LoadingProvider';
import {ToastProvider} from '@/context/ToastProvider';

import Component from './component';
import Content from './content';
import Function from './function';
import Module from './module';
import Navigation from './navigation';
import Properties from './properties';
import TopBar from './topbar';

import Loading from '@/component/loading';
import Toast from '@/component/toast';

import CTheme from '@/constant/CTheme';

const Page = () => {
    const theme = createTheme(CTheme);
    const searchParams = useSearchParams();

    const navigationType = {
        content: 'content',
        variabel: 'variabel',
        function: 'function',
        page: 'page',
        module: 'module',
    };
    const id = searchParams.get('id');

    const [content, setContent] = useState([]);
    const [selected, setSelected] = useState(null);
    const [activeNavigation, setActiveNavigation] = useState(navigationType.content);

    const activeContent = () => {
        if (activeNavigation === navigationType.content)
            return <Content content={content} selected={selected} setSelected={setSelected} />;
        else if (activeNavigation === navigationType.function) return <Function />;
        else if (activeNavigation === navigationType.module) return <Module />;
    };

    return (
        <ThemeProvider theme={theme}>
            <LoadingProvider>
                <ToastProvider>
                    <Loading />
                    <Toast />
                    <TopBar content={content} setContent={setContent} id={id} />
                    <Grid container justifyContent="space-between" display="flex">
                        <Component content={content} setContent={setContent} setSelected={setSelected} />
                        <Grid item xs={8} marginX="17%">
                            <Navigation
                                activeNavigation={activeNavigation}
                                navigationType={navigationType}
                                setActiveNavigation={setActiveNavigation}
                            />
                            {activeContent()}
                        </Grid>
                        <Properties
                            activeNavigation={activeNavigation}
                            content={content}
                            navigationType={navigationType}
                            selected={selected}
                            setContent={setContent}
                            setSelected={setSelected}
                        />
                    </Grid>
                </ToastProvider>
            </LoadingProvider>
            <CssBaseline />
        </ThemeProvider>
    );
};

export default Page;
