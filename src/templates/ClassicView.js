'use client';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';

import GeneralTable from '@/hooks/GeneralTable';

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
    } = GeneralTable(props);

    return (
        <>
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
        </>
    );
};

export default ClassicView;
