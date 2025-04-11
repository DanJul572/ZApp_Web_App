'use client';

import {use, useEffect, useState} from 'react';

import Request from './Request';
import Translator from './Translator';

import CApiUrl from '@/constant/CApiUrl';
import CModuleID from '@/constant/CModuleID';

const Content = props => {
    const {params, isBuilder} = props;

    const {get} = Request();
    const {t} = Translator();

    const [content, setContent] = useState(null);
    const [page, setPage] = useState(null);

    const {id} = use(params);

    const getContent = () => {
        const param = {moduleId: CModuleID.views, rowId: id};
        get(CApiUrl.common.detail, param)
            .then(res => {
                if (res) {
                    const content = res.content;
                    const page = res.page;
                    setContent(content);
                    setPage(page);
                } else {
                    setContent(t('empty_content'));
                }
            })
            .catch(err => {
                setContent(err);
            });
    };

    useEffect(() => {
        if (!isBuilder && id) {
            getContent();
        }
    }, [id]);

    return {content: content, page: page};
};

export default Content;
