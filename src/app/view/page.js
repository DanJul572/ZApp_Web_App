'use client';

import {useRouter} from 'next/navigation';

import Main from '@/layout/Main';
import ClassicView from '@/templates/ClassicView';

const View = () => {
    const {push} = useRouter();

    const onAdd = () => {
        push('/view/create');
    };

    return (
        <Main>
            <ClassicView moduleID={1} onAdd={onAdd} />
        </Main>
    );
};

export default View;
