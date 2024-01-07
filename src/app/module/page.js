'use client';

import {useRouter} from 'next/navigation';
import ClassicView from '@/templates/ClassicView';

const Module = () => {
    const {push} = useRouter();

    const onAdd = () => {
        push('/module/create');
    };

    return <ClassicView moduleID={2} onAdd={onAdd} />;
};

export default Module;
