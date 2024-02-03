'use client';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';
import GeneralTable from '@/hooks/GeneralTable';

const ClassicView = props => {
    const {
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
    } = GeneralTable(props);

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
