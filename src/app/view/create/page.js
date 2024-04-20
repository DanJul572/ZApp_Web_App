'use client';

import {useState} from 'react';
import {useSearchParams} from 'next/navigation';

import Box from '@mui/material/Box';

import Component from './component';
import Content from './content';
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
            <Box container="true">
                <Component content={content} setContent={setContent} setSelected={setSelected} />
                <Box marginX={45} marginTop={8}>
                    <Content content={content} selected={selected} setSelected={setSelected} />
                </Box>
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
            </Box>
        </Empty>
    );
};

export default Page;
