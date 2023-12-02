'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAlert} from '@/context/AlertProvider';

import Table from '@/component/table';

import CActionType from '@/constant/CActionType';
import mockColumns from '@/mock/module/columns';
import request from '@/helper/request';

export default function Module() {
    const {push} = useRouter();
    const {setAlert} = useAlert();

    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [pageSize, setPageSize] = useState(1);
    const [rowCount, setRowCount] = useState(10);

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

    const getRows = () => {
        setLoading(true);

        const body = {
            page: 1,
            search: {
                column: 'label',
                value: 'ex',
            },
            sort: {
                column: 'createdAt',
                value: 'ASC',
            },
        };

        request
            .post('/module/list', body)
            .then(res => {
                setRows(res);
                setPageSize(10);
                setRowCount(1);
            })
            .catch(err => {
                setAlert({
                    status: true,
                    type: 'error',
                    message: err,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getRows();

        return () => {
            setAlert(null);
        };
    }, []);

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
                isLoading={loading}
                onChangePage={() => {}}
                onClickRowAction={() => {}}
                onClickToolbarAction={onCLickToolbarAction}
                onDelete={() => {}}
                onSearch={() => {}}
                onSelect={() => {}}
                onSort={() => {}}
                pageSize={pageSize}
                pageIndex={0}
                rowCount={rowCount}
                rows={rows}
            />
        </div>
    );
}
