'use client';

import {useRouter} from 'next/navigation';

import Main from '@/layout/Main';
import Table from '@/component/table';

import mockColumns from '@/mock/view/columns';
import mockRows from '@/mock/view/rows';

import CActionType from '@/constant/CActionType';

export default function View() {
    const {push} = useRouter();

    const actionList = [
        {
            type: CActionType.insert.value,
            path: '/',
        },
        {
            type: CActionType.update.value,
            path: '/',
        },
        {
            type: CActionType.delete.value,
            path: '/',
        },
    ];

    const onCLickToolbarAction = action => {
        if (action.value === CActionType.insert.value) push('/view/create');
    };

    return (
        <Main>
            <Table
                action={actionList}
                columnKey={'id'}
                columns={mockColumns}
                enableExport={true}
                enableHiding={true}
                enablePagination={true}
                enableRowSelection={true}
                enableSearch={true}
                enableSorting={true}
                onChangePage={() => {}}
                onClickRowAction={() => {}}
                onClickToolbarAction={onCLickToolbarAction}
                onDelete={() => {}}
                onSearch={() => {}}
                onSelect={() => {}}
                onSort={() => {}}
                pageCount={1}
                pageIndex={0}
                rowCount={1}
                rows={mockRows}
            />
        </Main>
    );
}
