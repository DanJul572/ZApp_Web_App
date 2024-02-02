'use client';

import ClassicView from '@/templates/ClassicView';

import CModuleID from '@/constant/CModuleID';
import CActionType from '@/constant/CActionType';

const Page = () => {
    const actions = [
        {
            type: CActionType.update.value,
            path: '/module/create',
        },
        {
            type: CActionType.insert.value,
            path: '/module/create',
        },
        {
            type: CActionType.delete.value,
        },
    ];

    return <ClassicView moduleID={CModuleID.modules} actions={actions} />;
};

export default Page;
