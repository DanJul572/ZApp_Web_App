import React, {useEffect, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {actionType} from '@/constant';
import AdvanceFilter from './advance_filter';
import ExportDialog from './export_dialog';
import ToolBarComponent from './toolbar_component';
import RowAction from './row_action';
import ToolbarAction from './toolbar_action';
import RowCustomActionDialog from './custom_action_dialog';
import {Box, Stack} from '@mui/material';
import {boolean, numeric, tableReference} from '@/helper/data_display';
import dataType from '@/constant/data_type';

const Table = props => {
    const {
        action = [],
        advanceFilterFormat = 'sql',
        columnKey,
        columnPinning = {},
        columns = [],
        enableAdvanceFilter = false,
        enableColumnResizing = false,
        enableDensityToggle = false,
        enableExport = false,
        enableFilter = false,
        enableFullScreenToggle = false,
        enableHiding = false,
        enablePagination = false,
        enablePinning = false,
        enableRowSelection = false,
        enableSearch = false,
        enableSorting = false,
        onAdvanceFilter,
        isLoading = false,
        onChangePage,
        onClickRowAction,
        onClickToolbarAction,
        onDownload,
        onFilter,
        onSearch,
        onSelect,
        onSort,
        pageCount = 0,
        pageIndex = 1,
        rowCustomAction = [],
        rowCount = 0,
        rows = [],
        toolbarCustomAction = [],
    } = props;

    const [pagination, setPagination] = useState({
        pageIndex: pageIndex,
        pageSize: pageCount,
    });
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    const [openExportDialog, setOpenExportDialog] = useState(false);
    const [openAdvanceFilterDialog, setOpenAdvanceFilterDialog] = useState(false);
    const [openRowCustomActionDialog, setOpenRowCustomActionDialog] = useState(false);
    const [rowClicked, setRowClicked] = useState(null);

    const initialState = {
        density: 'compact',
        pagination: pagination,
        columnPinning: columnPinning,
    };
    const muiTableContainerProps = {sx: {maxHeight: '500px'}};
    const muiTablePaginationProps = {rowsPerPageOptions: [10]};

    const newColumns = columns.map(column => {
        column.Cell = ({cell}) => rowDisplay(cell, column.type);

        if (column.footer) column.Footer = () => columnFooter(column.footer);

        return column;
    });

    const rowDisplay = (cell, type) => {
        const value = cell.getValue();

        if (type === dataType.foreignKey.value) return tableReference(value);

        if (type === dataType.boolean.value) return boolean(value);

        if (type === dataType.autoIncrement.value || type === dataType.integer.value)
            return numeric(value);

        return value;
    };

    const columnFooter = footer => {
        if (!footer) return false;

        return (
            <Stack>
                {footer.label} :<Box color="warning.main">{footer.value}</Box>
            </Stack>
        );
    };

    const isSupportRowAction = () => {
        return action.filter(item => item.type !== actionType.insert.value).length ? true : false;
    };

    const isSupportAddAction = () => {
        return action.find(item => item.type === actionType.insert.value) ? true : false;
    };

    const displayColumnDefOptions = () => {
        if (!isSupportRowAction()) return false;
        return {
            'mrt-row-actions': {
                size: 120,
            },
        };
    };

    const toolbarAction = () => {
        if (!toolbarCustomAction.length && !isSupportAddAction()) return;
        return (
            <ToolbarAction
                onClickToolbarAction={onClickToolbarAction}
                toolbarCustomAction={toolbarCustomAction}
                isSupportAddAction={isSupportAddAction()}
            />
        );
    };

    const toolbarComponent = table => {
        return (
            <ToolBarComponent
                table={table}
                enableSearch={enableSearch}
                enableFilter={enableFilter}
                enableAdvanceFilter={enableAdvanceFilter}
                enableHiding={enableHiding}
                enableDensityToggle={enableDensityToggle}
                enableFullScreenToggle={enableFullScreenToggle}
                enableExport={enableExport}
                setOpenAdvanceFilterDialog={setOpenAdvanceFilterDialog}
                setOpenExportDialog={setOpenExportDialog}
            />
        );
    };

    const rowAction = row => {
        return (
            <RowAction
                onClickRowAction={onClickRowAction}
                action={action}
                row={row}
                isSupportRowAction={isSupportRowAction}
                columnKey={columnKey}
                rowCustomAction={rowCustomAction}
                setOpenRowCustomActionDialog={setOpenRowCustomActionDialog}
                setRowClicked={setRowClicked}
            />
        );
    };

    useEffect(() => {
        if (enablePagination) onChangePage(pagination.pageIndex);
    }, [pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        if (enableFilter) onFilter(columnFilters);
    }, [columnFilters]);

    useEffect(() => {
        if (enableSorting) onSort(sorting);
    }, [sorting]);

    useEffect(() => {
        if (enableRowSelection) onSelect(Object.keys(rowSelection));
    }, [rowSelection]);

    return (
        <>
            <MaterialReactTable
                columns={newColumns}
                data={rows}
                displayColumnDefOptions={displayColumnDefOptions()}
                enableColumnActions={false}
                enableColumnFilters={enableFilter}
                enableColumnResizing={enableColumnResizing}
                enableDensityToggle={enableDensityToggle}
                enableEditing={isSupportRowAction}
                enableFilterMatchHighlighting={false}
                enableFullScreenToggle={enableFullScreenToggle}
                enableGlobalFilter={enableSearch}
                enableHiding={enableHiding}
                enablePagination={enablePagination}
                enablePinning={enablePinning}
                enableRowSelection={enableRowSelection}
                enableSorting={enableSorting}
                enableStickyFooter
                enableStickyHeader
                getRowId={row => row[columnKey]}
                initialState={initialState}
                manualFiltering
                manualPagination
                manualSorting
                muiTableContainerProps={muiTableContainerProps}
                muiTablePaginationProps={muiTablePaginationProps}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={onSearch}
                onPaginationChange={setPagination}
                onRowSelectionChange={setRowSelection}
                onSortingChange={setSorting}
                pageCount={pageCount}
                positionActionsColumn="last"
                positionToolbarAlertBanner="none"
                renderRowActions={({row}) => rowAction(row)}
                renderTopToolbarCustomActions={toolbarAction}
                renderToolbarInternalActions={({table}) => toolbarComponent(table)}
                rowCount={rowCount}
                state={{pagination, columnFilters, sorting, rowSelection, isLoading}}
            />
            {enableAdvanceFilter && (
                <AdvanceFilter
                    columns={columns}
                    enableAdvanceFilter={enableAdvanceFilter}
                    format={advanceFilterFormat}
                    onAdvanceFilter={onAdvanceFilter}
                    openAdvanceFilterDialog={openAdvanceFilterDialog}
                    setOpenAdvanceFilterDialog={setOpenAdvanceFilterDialog}
                />
            )}
            {enableExport && (
                <ExportDialog
                    openExportDialog={openExportDialog}
                    setOpenExportDialog={setOpenExportDialog}
                    onDownload={onDownload}
                />
            )}
            {rowCustomAction.length > 0 && (
                <RowCustomActionDialog
                    openRowCustomActionDialog={openRowCustomActionDialog}
                    setOpenRowCustomActionDialog={setOpenRowCustomActionDialog}
                    rowCustomAction={rowCustomAction}
                    rowClicked={rowClicked}
                    onClickRowAction={onClickRowAction}
                />
            )}
        </>
    );
};

export default Table;
