'use client';

import {useRouter} from 'next/navigation';

import Main from '@/layout/Main';
import Table from '@/component/table';

import mockColumns from '@/mock/view/columns';
import mockRows from '@/mock/view/rows';

import actionType from '@/constant/action_type';

export default function View() {
    const {push} = useRouter();

    const actionList = [
        {
            type: actionType.insert.value,
            path: '/',
        },
        {
            type: actionType.update.value,
            path: '/',
        },
        {
            type: actionType.delete.value,
            path: '/',
        },
    ];

    const onCLickToolbarAction = action => {
        if (action.value === actionType.insert.value) push('/view/create');
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
                pageIndex={1}
                rowCount={1}
                rows={mockRows}
            />
        </Main>
    );
}
