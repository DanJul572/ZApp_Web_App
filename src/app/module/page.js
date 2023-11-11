'use client';

import {useRouter} from 'next/navigation';

import Table from '@/component/table';

import ACTION_TYPE from '@/constant/ACTION_TYPE';
import mockColumns from '@/mock/module/columns';
import mockRows from '@/mock/module/rows';

export default function Module() {
    const {push} = useRouter();

    const actionList = [
        {
            type: ACTION_TYPE.insert.value,
            path: '/',
        },
        {
            type: ACTION_TYPE.update.value,
            path: '/',
        },
        {
            type: ACTION_TYPE.delete.value,
            path: '/',
        },
        {
            type: ACTION_TYPE.detail.value,
            path: '/',
        },
    ];

    const onCLickToolbarAction = action => {
        if (action.value === ACTION_TYPE.insert.value) push('/module/create');
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
                onChangePage={(val) => console.log(val)}
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
