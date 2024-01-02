'use client';

import {useEffect, useState} from 'react';
import {useAlert} from '@/context/AlertProvider';
import {useLoading} from '@/context/LoadingProvider';
import {useRouter} from 'next/navigation';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';

import CActionType from '@/constant/CActionType';
import request from '@/helper/request';

const ClassicView = props => {
    const {moduleID} = props;

    const {push} = useRouter();
    const {setAlert} = useAlert();
    const {setLoading} = useLoading();

    const [columns, setColumns] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const actionList = [
        {
            type: CActionType.insert.value,
        }
    ];

    const getColumns = () => {
        setLoading(true);

        const body = {
            id: moduleID,
        };

        request
            .post('/general/columns', body)
            .then(res => {
                setColumns(res);
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
            id: moduleID,
            page: page,
            filter: filter,
            sort: sort,
        };

        request
            .post('/general/rows', body)
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

    const onCLickToolbarAction = action => {
        if (action.value === CActionType.insert.value) push('/view/create');
    };

    const onConfirm = confirm => {
        if (confirm) onDelete();
        setOpenConfirmDialog(false);
    };

    useEffect(() => {
        if (columns && columns.length > 0) {
            getRows();
        }
    }, [columns, page, filter, sort]);

    useEffect(() => {
        getColumns();
        return () => setAlert(null);
    }, []);

    return (
        <>
            <Table
                action={actionList}
                columnKey={'id'}
                columns={columns}
                enableExport={true}
                enableHiding={true}
                enablePagination={true}
                enableFilter={true}
                enableSorting={true}
                onChangePage={setPage}
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
        </>
    );
};

export default ClassicView;
