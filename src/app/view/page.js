'use client';

import Typography from '@mui/material/Typography';

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
    ];

    return (
        <Main>
            <Typography fontSize={20} fontWeight="bold">
                Views
            </Typography>
            <ClassicView moduleID={CModuleID.modules} actions={actions} />
        </Main>
    );
};

export default Page;
