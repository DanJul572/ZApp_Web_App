'use client';

import ClassicView from '@/templates/ClassicView';

import CActionType from '@/constant/CActionType';
import CApiUrl from '@/constant/CApiUrl';
import CModuleID from '@/constant/CModuleID';

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
            api: CApiUrl.module.delete,
        },
    ];

    return <ClassicView moduleID={CModuleID.modules} actions={actions} />;
};

export default Page;
