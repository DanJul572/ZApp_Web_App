'use client';

import Box from '@mui/material/Box';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';

import TableFunction from '@/hook/TableFunction';

const ClassicView = props => {
    const {
        actions,
        columnKey,
        columns,
        onClickRowAction,
        onCLickToolbarAction,
        onConfirm,
        openConfirmDialog,
        rowCount,
        rows,
        setFilter,
        setPage,
        setSort,
    } = TableFunction(props);

    return (
        <Box>
            <Table
                action={actions}
                columnKey={columnKey}
                columns={columns}
                enableRowSelection={true}
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
        </Box>
    );
};

export default ClassicView;
