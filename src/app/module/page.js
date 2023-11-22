'use client';

import {useRouter} from 'next/navigation';

import Table from '@/component/table';

import CActionType from '@/constant/CActionType';
import mockColumns from '@/mock/module/columns';
import mockRows from '@/mock/module/rows';

export default function Module() {
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
        {
            type: CActionType.detail.value,
            path: '/',
        },
    ];

    const onCLickToolbarAction = action => {
        if (action.value === CActionType.insert.value) push('/module/create');
    };

    return (
        <div>
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
        </div>
    );
}
