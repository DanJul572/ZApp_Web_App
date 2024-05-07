'use client';

import ClassicView from '@/template/ClassicView';

import CModuleID from '@/constant/CModuleID';
import CActionType from '@/constant/CActionType';

const Page = () => {
    const actions = [
        {
            type: CActionType.update.value,
            path: '/menu/create',
        },
        {
            type: CActionType.insert.value,
            path: '/menu/create',
        },
        {
            type: CActionType.delete.value,
        },
    ];

    return <ClassicView moduleID={CModuleID.menus} actions={actions} />;
};

export default Page;
