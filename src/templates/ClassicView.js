'use client';

import {useEffect} from 'react';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';
import Query from '@/hooks/query';

const ClassicView = props => {
    const {
        columns,
        page,
        filter,
        sort,
        getRows,
        getColumns,
        setAlert,
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
    } = Query(props);

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
                action={actions}
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
