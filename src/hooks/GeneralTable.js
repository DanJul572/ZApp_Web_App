import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {useAlert} from '@/context/AlertProvider';
import {useLoading} from '@/context/LoadingProvider';

import Request from '@/hooks/Request';

import CActionType from '@/constant/CActionType';

const GeneralTable = props => {
    const {moduleID, actions} = props;

    const {post} = Request();
    const {push} = useRouter();

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

    const getColumns = () => {
        setLoading(true);

        const body = {
            id: moduleID,
        };

        post('/general/columns', body)
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

        post('/general/rows', body)
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

        post('/general/delete', body)
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
        if (action.type === CActionType.insert.value) push(action.path);
    };

    const onClickRowAction = data => {
        if (data.action.type === CActionType.delete.value) {
            setSelectedRow(data.row);
            setOpenConfirmDialog(true);
        } else if (data.action.type === CActionType.update.value) {
            push(`${data.action.path}?id=${data.row[columnKey]}`);
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

    return {
        columns,
        actions,
        setPage,
        onCLickToolbarAction,
        onClickRowAction,
        setFilter,
        setSort,
        rowCount,
        rows,
        openConfirmDialog,
        onConfirm,
    };
};

export default GeneralTable;
