'use client';

import {useRouter} from 'next/navigation';
import ClassicView from '@/templates/ClassicView';

import CModuleID from '@/constant/CModuleID';

const Page = () => {
    const {push} = useRouter();

    const onAdd = () => {
        push('/module/create');
    };

    return <ClassicView moduleID={CModuleID.modules} onAdd={onAdd} />;
};

export default Page;
