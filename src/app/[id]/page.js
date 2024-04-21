'use client';

import {useEffect, useState} from 'react';

import Interpreter from '@/interpreter';
import Main from '@/layout/Main';

import Request from '@/hooks/Request';

import CApiUrl from '@/constant/CApiUrl';
import CModuleID from '@/constant/CModuleID';

const Page = props => {
    const {params} = props;

    const {get} = Request();

    const [content, setContent] = useState(null);
    const [page, setPage] = useState(null);

    const getContent = () => {
        const param = {
            moduleId: CModuleID.views,
            rowId: params.id,
        };
        get(CApiUrl.general.detail, param)
            .then(res => {
                if (res) {
                    const content = res.content;
                    const page = res.page;
                    setContent(content);
                    setPage(page);
                } else {
                    console.log('View is not found.');
                }
            })
            .catch(err => {
                console.log(`Error : ${err}`);
            });
    };

    useEffect(() => {
        getContent();
    }, []);

    return <Main>{content && <Interpreter isBuilder={false} content={content} page={page} />}</Main>;
};

export default Page;
