'use client';

import {useState} from 'react';
import {useSearchParams} from 'next/navigation';

import Grid from '@mui/material/Grid';

import Component from './component';
import Content from './content';
// import Function from './function';
// import Module from './module';
// import Navigation from './navigation';
import Properties from './properties';
import TopBar from './topbar';

import Empty from '@/layout/Empty';

const Page = () => {
    const searchParams = useSearchParams();

    const navigationType = {
        content: 'content',
        variabel: 'variabel',
        function: 'function',
        page: 'page',
        module: 'module',
    };
    const activeNavigation = navigationType.content;
    const id = searchParams.get('id');

    const [label, setLabel] = useState(null);
    const [page, setPage] = useState(null);
    const [content, setContent] = useState([]);
    const [selected, setSelected] = useState(null);

    // const [activeNavigation, setActiveNavigation] = useState(navigationType.content);

    /*
    const activeContent = () => {
        if (activeNavigation === navigationType.content)
            return <Content content={content} selected={selected} setSelected={setSelected} />;
        else if (activeNavigation === navigationType.function) return <Function />;
        else if (activeNavigation === navigationType.module) return <Module />;
    };
    */

    return (
        <Empty>
            <TopBar
                content={content}
                setContent={setContent}
                label={label}
                setLabel={setLabel}
                page={page}
                setPage={setPage}
                id={id}
            />
            <Grid container justifyContent="space-between" display="flex">
                <Component content={content} setContent={setContent} setSelected={setSelected} />
                <Grid item xs={8} marginX="17%">
                    {/* <Navigation
                        activeNavigation={activeNavigation}
                        navigationType={navigationType}
                        setActiveNavigation={setActiveNavigation}
                    /> */}
                    <Content content={content} selected={selected} setSelected={setSelected} />
                </Grid>
                <Properties
                    activeNavigation={activeNavigation}
                    content={content}
                    navigationType={navigationType}
                    selected={selected}
                    setContent={setContent}
                    label={label}
                    setLabel={setLabel}
                    page={page}
                    setPage={setPage}
                    setSelected={setSelected}
                />
            </Grid>
        </Empty>
    );
};

export default Page;
