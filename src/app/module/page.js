'use client';
import {Table} from '@/component';
import mockColumns from '@/mock/module/columns';
import mockRows from '@/mock/module/rows';
import actionType from '@/constant/action_type';

export default function Module() {
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
        {
            type: actionType.detail.value,
            path: '/',
        },
    ];

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
                onClickToolbarAction={() => {}}
                onDelete={() => {}}
                onSearch={() => {}}
                onSelect={() => {}}
                onSort={() => {}}
                pageCount={1}
                pageIndex={1}
                rowCount={1}
                rows={mockRows}
            />
        </div>
    );
}
