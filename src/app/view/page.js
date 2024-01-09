'use client';

import {useRouter} from 'next/navigation';

import Main from '@/layout/Main';
import ClassicView from '@/templates/ClassicView';

import CModuleID from '@/constant/CModuleID';

const Page = () => {
    const {push} = useRouter();

    const onAdd = () => {
        push('/view/create');
    };

    return (
        <Main>
            <ClassicView moduleID={CModuleID.views} onAdd={onAdd} />
        </Main>
    );
};

export default Page;
