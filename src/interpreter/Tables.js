import Typography from '@mui/material/Typography';

import Runner from '@/runner';

import Confirm from '@/component/dialog/Confirm';
import Table from '@/component/table';

import CActionType from '@/constant/CActionType';
import CTableType from '@/constant/CTableType';

import GeneralTable from '@/hooks/GeneralTable';

const Tables = props => {
    const {type, properties, isBuilder} = props;

    const {runFunction, getValues} = Runner();

    const moduleID = getValues(properties.moduleID, 'js');
    const actions = properties.actions;

    const prop = {
        moduleID,
        actions,
        isBuilder,
    };

    const {columns, columnKey, rowCount, rows, openConfirmDialog, setPage, setFilter, setSort, onConfirm} =
        GeneralTable(prop);

    const onCLickToolbarAction = action => {
        if (action.type === CActionType.insert.value) runFunction(action.onClick);
    };

    const onClickRowAction = data => {
        const action = data.action;
        const param = {row: data.row};
        if (action.type === CActionType.update.value) runFunction(action.onClick, param);
    };

    const content = () => {
        if (isBuilder) {
            return (
                <Typography fontWeight="bold" textAlign="center">
                    TABLE COMPONENT CANNOT SHOW IN BUILDER MODE.
                </Typography>
            );
        } else if (type === CTableType.table.value && moduleID) {
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
        }
    };

    return content();
};

export default Tables;
