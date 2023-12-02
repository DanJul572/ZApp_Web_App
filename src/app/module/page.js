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
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(10);

    const actionList = [
        {
            type: CActionType.insert.value,
            path: '/',
        },
        {
            type: CActionType.delete.value,
            path: '/',
        },
    ];

    const onCLickToolbarAction = action => {
        if (action.value === CActionType.insert.value) push('/module/create');
    };

    const getRows = () => {
        setLoading(true);

        const body = {
            page: page,
            filter: filter,
            sort: sort,
        };

        request
            .post('/module/list', body)
            .then(res => {
                setRows(res.rows);
                setRowCount(res.count);
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
    }, [page, filter, sort]);

    useEffect(() => {
        return () => setAlert(null);
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
                enableFilter={true}
                enableSorting={true}
                isLoading={loading}
                onChangePage={setPage}
                onClickRowAction={() => {}}
                onClickToolbarAction={onCLickToolbarAction}
                onFilter={setFilter}
                onSort={setSort}
                pageIndex={0}
                rowCount={rowCount}
                rows={rows}
            />
        </div>
    );
}
