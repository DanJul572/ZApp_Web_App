'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAlert} from '@/context/AlertProvider';
import {useLoading} from '@/context/LoadingProvider';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';

import CActionType from '@/constant/CActionType';
import mockColumns from '@/mock/module/columns';
import request from '@/helper/request';

export default function Module() {
    const {push} = useRouter();
    const {setAlert} = useAlert();
    const {setLoading} = useLoading();

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [rowSelected, setRowSelected] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const actionList = [
        {
            type: CActionType.insert.value,
        },
        {
            type: CActionType.delete.value,
        },
    ];

    const onCLickToolbarAction = action => {
        if (action.value === CActionType.insert.value) push('/module/create');
    };

    const onClickRowAction = data => {
        if (data.action.value === CActionType.delete.value) {
            setOpenConfirmDialog(true);
            setRowSelected(data.row);
        }
    };

    const onConfirm = confirm => {
        if (confirm) onDelete();
        setOpenConfirmDialog(false);
    };

    const onDelete = () => {
        setLoading(true);

        const body = {
            id: rowSelected.id,
        };

        request
            .post('/module/delete', body)
            .then(res => {
                getRows();
                setAlert({
                    status: true,
                    type: 'success',
                    message: res,
                });
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
                onChangePage={setPage}
                onClickRowAction={onClickRowAction}
                onClickToolbarAction={onCLickToolbarAction}
                onFilter={setFilter}
                onSort={setSort}
                pageIndex={0}
                rowCount={rowCount}
                rows={rows}
            />
            <Confirm
                open={openConfirmDialog}
                title="Delete Module"
                text="Are you sure you want to delete this module ?"
                confirmButton="Delete"
                cancelButton="Cancel"
                onConfirm={onConfirm}
            />
        </div>
    );
}
