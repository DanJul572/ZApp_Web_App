'use client';

import Box from '@mui/material/Box';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';

import TableFunction from '@/hook/TableFunction';
import Translator from '@/hook/Translator';

const ClassicView = props => {
    const {t} = Translator();

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
                title={t('delete_data')}
                text={t('confirm_delete')}
                confirmButton={t('delete')}
                cancelButton={t('cancel')}
                onConfirm={onConfirm}
            />
        </Box>
    );
};

export default ClassicView;
