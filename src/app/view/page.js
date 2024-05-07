'use client';

import Main from '@/layout/Main';
import ClassicView from '@/template/ClassicView';

import CModuleID from '@/constant/CModuleID';
import CActionType from '@/constant/CActionType';

const Page = () => {
    const actions = [
        {
            type: CActionType.update.value,
            path: '/view/create',
        },
        {
            type: CActionType.insert.value,
            path: '/view/create',
        },
        {
            type: CActionType.delete.value,
        },
    ];

    return (
        <Main>
            <ClassicView moduleID={CModuleID.views} actions={actions} />
        </Main>
    );
};

export default Page;
