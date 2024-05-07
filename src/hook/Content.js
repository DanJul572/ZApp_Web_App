'use client';

import {useEffect, useState} from 'react';

import Request from '@/hook/Request';

import CApiUrl from '@/constant/CApiUrl';
import CModuleID from '@/constant/CModuleID';

const Content = props => {
    const {params, isBuilder} = props;

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
                    setContent('View is not found.');
                }
            })
            .catch(err => {
                setContent(`Error : ${err}`);
            });
    };

    useEffect(() => {
        if (!isBuilder) {
            getContent();
        }
    }, []);

    return {
        content: content,
        page: page,
    };
};

export default Content;
