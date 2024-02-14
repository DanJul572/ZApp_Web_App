'use client';

import {useEffect, useState} from 'react';

import Interpreter from '@/interpreter';
import Main from '@/layout/Main';

import Request from '@/hooks/Request';

import CModuleID from '@/constant/CModuleID';

const Page = props => {
    const {params} = props;

    const {post} = Request();

    const [content, setContent] = useState(null);

    const getContent = () => {
        const body = {
            moduleId: CModuleID.views,
            rowId: params.id,
        };
        post('/general/detail', body)
            .then(res => {
                if (res) {
                    const content = res.content;
                    setContent(content);
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

    return <Main>{content ? <Interpreter isBuilder={false} content={content} /> : <></>}</Main>;
};

export default Page;
