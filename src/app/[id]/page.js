'use client';

import {useEffect, useState} from 'react';

import {useAlert} from '@/context/AlertProvider';
import {useLoading} from '@/context/LoadingProvider';

import Interpreter from '@/interpreter';
import Main from '@/layout/Main';

import request from '@/helper/request';

const Page = props => {
    const {params} = props;

    const {setLoading} = useLoading();
    const {setAlert} = useAlert();

    const [content, setContent] = useState();

    const getContent = () => {
        setLoading(true);
        const body = {
            moduleId: 1,
            field: 'id',
            id: params.id,
        };
        request
            .post('/general/detail', body)
            .then(res => {
                const content = JSON.parse(res.content);
                setContent(content);
            })
            .catch(err => {
                setAlert({
                    status: true,
                    type: 'error',
                    message: err,
                });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getContent();
    }, []);

    return (
        <Main>
            <Interpreter isBuilder={false} content={content} />
        </Main>
    );
};

export default Page;
