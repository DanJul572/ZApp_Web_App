import {useEffect, useState} from 'react';

import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import dataDisplay from '@/helper/data_display';

import AdvanceFilter from './AdvanceFilter';
import ExportDialog from './ExportDialog';
import RowAction from './RowAction';
import RowCustomActionDialog from './CustomActionDialog';
import ToolbarAction from './ToolbarAction';
import ToolBarComponent from './ToolbarComponent';

import ACTION_TYPE from '@/constant/ACTION_TYPE';

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
        isLoading = false,
        onAdvanceFilter,
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
        rowCount = 0,
        rowCustomAction = [],
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

    const muiTopToolbarProps = () => {
        if (!isSupportAddAction() && !toolbarCustomAction.length) return {style: {display: 'none'}};
    };

    const muiBottomToolbarProps = () => {
        if (!enablePagination && !onChangePage) return {style: {display: 'none'}};
    };

    const rowDisplay = (cell, type) => {
        const value = cell.getValue();
        return dataDisplay(type, value);
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
        return action.filter(item => item.type !== ACTION_TYPE.insert.value).length ? true : false;
    };

    const isSupportAddAction = () => {
        return action.find(item => item.type === ACTION_TYPE.insert.value) ? true : false;
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

    const table = useMaterialReactTable({
        columns: newColumns,
        data: rows,
        displayColumnDefOptions: displayColumnDefOptions(),
        enableColumnActions: false,
        enableColumnFilters: enableFilter,
        enableColumnResizing: enableColumnResizing,
        enableDensityToggle: enableDensityToggle,
        enableEditing: isSupportRowAction(),
        enableFilterMatchHighlighting: false,
        enableFullScreenToggle: enableFullScreenToggle,
        enableGlobalFilter: enableSearch,
        enableHiding: enableHiding,
        enablePagination: enablePagination,
        enablePinning: enablePinning,
        enableRowSelection: enableRowSelection,
        enableSorting: enableSorting,
        enableStickyFooter: true,
        enableStickyHeader: true,
        getRowId: row => row[columnKey],
        initialState: initialState,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiBottomToolbarProps: muiBottomToolbarProps(),
        muiTableContainerProps: muiTableContainerProps,
        muiTablePaginationProps: muiTablePaginationProps,
        muiTopToolbarProps: muiTopToolbarProps(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: onSearch,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        pageCount: pageCount,
        positionActionsColumn: 'last',
        positionToolbarAlertBanner: 'none',
        renderRowActions: ({row}) => rowAction(row),
        renderToolbarInternalActions: ({table}) => toolbarComponent(table),
        renderTopToolbarCustomActions: toolbarAction,
        rowCount: rowCount,
        state: {pagination, columnFilters, sorting, rowSelection, isLoading},
    });

    useEffect(() => {
        if (enablePagination && onChangePage) onChangePage(pagination.pageIndex);
    }, [pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        if (enableFilter && onFilter) onFilter(columnFilters);
    }, [columnFilters]);

    useEffect(() => {
        if (enableSorting && onSort) onSort(sorting);
    }, [sorting]);

    useEffect(() => {
        if (enableRowSelection && onSelect) onSelect(Object.keys(rowSelection));
    }, [rowSelection]);

    return (
        <>
            <MaterialReactTable table={table} />
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
