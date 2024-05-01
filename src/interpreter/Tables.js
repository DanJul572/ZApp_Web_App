import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Runner from '@/runner';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';

import CActionType from '@/constant/CActionType';
import CTableType from '@/constant/CTableType';

import TableFunction from '@/hooks/TableFunction';

const Tables = props => {
    const {type, properties, isBuilder} = props;

    const {runFunction} = Runner({isBuilder});

    const moduleID = properties.moduleID;
    const actions = properties.actions;

    const tableProps = {
        moduleID,
        actions,
        isBuilder,
    };

    const {
        columnKey,
        columns,
        openConfirmDialog,
        rowCount,
        rows,
        onConfirm,
        setFilter,
        setOpenConfirmDialog,
        setPage,
        setSelectedRow,
        setSort,
    } = TableFunction(tableProps);

    const onCLickToolbarAction = action => {
        if (action.type === CActionType.insert.value) runFunction(action.onClick);
    };

    const onClickRowAction = data => {
        const action = data.action;
        const param = {row: data.row};
        if (action.type === CActionType.update.value) {
            runFunction(action.onClick, param);
        } else if (data.action.type === CActionType.delete.value) {
            setSelectedRow(data.row);
            setOpenConfirmDialog(true);
        }
    };

    const content = () => {
        if (isBuilder) {
            return (
                <Typography fontSize="10" textAlign="center">
                    TABLE COMPONENT CANNOT SHOW IN BUILDER MODE
                </Typography>
            );
        } else if (type === CTableType.table.value && moduleID) {
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
        }
    };

    return content();
};

export default Tables;
