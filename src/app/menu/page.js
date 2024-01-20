'use client';

import {useRouter} from 'next/navigation';
import ClassicView from '@/templates/ClassicView';

import CModuleID from '@/constant/CModuleID';

const Page = () => {
    const {push} = useRouter();

    const onAdd = () => push('/menu/create');

    const onEdit = id => push(`/menu/create?id=${id}`);

    return <ClassicView moduleID={CModuleID.menus} onAdd={onAdd} onEdit={onEdit} />;
};

export default Page;
