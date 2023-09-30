'use client';
import {Table} from '@/component';
import mock_columns from '@/mock/module/columns';
import mock_rows from '@/mock/module/rows';
import action_type from '@/constant/action_type';

export default function Module() {
    const actionList = [
        {
            type: action_type.insert.value,
            path: '/',
        },
        {
            type: action_type.update.value,
            path: '/',
        },
        {
            type: action_type.delete.value,
            path: '/',
        },
        {
            type: action_type.detail.value,
            path: '/',
        },
    ];

    return (
        <div>
            <Table
                action={actionList}
                columnKey={'id'}
                columns={mock_columns}
                enableHiding={true}
                enablePagination={true}
                enableRowSelection={true}
                enableSearch={true}
                enableSorting={true}
                onAdd={() => {}}
                onChangePage={() => {}}
                onDelete={() => {}}
                onSearch={() => {}}
                onSelect={() => {}}
                onSort={() => {}}
                onUpdate={() => {}}
                pageCount={1}
                pageIndex={1}
                rowCount={1}
                rows={mock_rows}
            />
        </div>
    );
}
