'use client';

import {useRouter} from 'next/navigation';

import Main from '@/layout/Main';
import ClassicView from '@/templates/ClassicView';

import CModuleID from '@/constant/CModuleID';

const Page = () => {
    const {push} = useRouter();

    const onAdd = () => push('/view/create');

    const onEdit = id => push(`/view/create?id=${id}`);

    return (
        <Main>
            <ClassicView moduleID={CModuleID.views} onAdd={onAdd} onEdit={onEdit} />
        </Main>
    );
};

export default Page;
