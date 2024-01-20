'use client';

import {useEffect, useState} from 'react';
import {useAlert} from '@/context/AlertProvider';
import {useLoading} from '@/context/LoadingProvider';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';

import CActionType from '@/constant/CActionType';
import request from '@/helper/request';

const ClassicView = props => {
    const {moduleID, onAdd, onEdit} = props;

    const {setAlert} = useAlert();
    const {setLoading} = useLoading();

    const [columns, setColumns] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [columnKey, setColumnKey] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const actionList = [
        {
            type: CActionType.insert.value,
        },
        {
            type: CActionType.delete.value,
        },
        {
            type: CActionType.update.value,
        },
    ];

    const getColumns = () => {
        setLoading(true);

        const body = {
            id: moduleID,
        };

        request
            .post('/general/columns', body)
            .then(res => {
                const columnKey = res.find(column => column.identity);
                setColumnKey(columnKey.accessorKey);
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

    const onDelete = () => {
        setLoading(true);

        const body = {
            moduleId: moduleID,
            id: selectedRow[columnKey],
        };

        request
            .post('/general/delete', body)
            .then(res => {
                setAlert({
                    status: true,
                    type: 'success',
                    message: res,
                });
                getRows();
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
        if (action.value === CActionType.insert.value && onAdd) onAdd();
    };

    const onClickRowAction = data => {
        if (data.action.value === CActionType.delete.value) {
            setSelectedRow(data.row);
            setOpenConfirmDialog(true);
        } else if (data.action.value === CActionType.update.value) {
            onEdit(data.row[columnKey]);
        }
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
                onClickRowAction={onClickRowAction}
                onFilter={setFilter}
                onSort={setSort}
                pageIndex={0}
                rowCount={rowCount}
                rows={rows}
            />
            <Confirm
                open={openConfirmDialog}
                title="Delete Data"
                text="Are you sure you want to delete this data ?"
                confirmButton="Delete"
                cancelButton="Cancel"
                onConfirm={onConfirm}
            />
        </>
    );
};

export default ClassicView;
