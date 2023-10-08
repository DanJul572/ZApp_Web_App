'use client';
import React, {useEffect, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {actionType} from '@/constant';
import AdvanceFilter from './advance_filter';
import ExportDialog from './export_dialog';
import ToolBarComponent from './toolbar_component';
import RowAction from './row_action';
import ToolbarAction from './toolbar_action';

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
        enableStickyHeader = false,
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
        rows = [],
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

    const initialState = {
        density: 'compact',
        pagination: pagination,
        columnPinning: columnPinning,
    };
    const muiTableContainerProps = {sx: {maxHeight: '500px'}};
    const muiTablePaginationProps = {rowsPerPageOptions: [10]};

    const isSupportAction = () => {
        return action.filter(item => item.type !== actionType.insert.value).length ? true : false;
    };

    const displayColumnDefOptions = () => {
        if (!action.length && !action.filter(item => item.type !== actionType.insert.value).length)
            return false;
        return {
            'mrt-row-actions': {
                size: 120,
            },
        };
    };

    const toolbarAction = () => {
        if (!action.length || !action.find(item => item.type === actionType.insert.value)) return;
        return <ToolbarAction onClickToolbarAction={onClickToolbarAction} />;
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
                isSupportAction={isSupportAction}
                columnKey={columnKey}
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
                columns={columns}
                data={rows}
                displayColumnDefOptions={displayColumnDefOptions()}
                enableColumnActions={false}
                enableColumnFilters={enableFilter}
                enableColumnResizing={enableColumnResizing}
                enableDensityToggle={enableDensityToggle}
                enableEditing={isSupportAction}
                enableFilterMatchHighlighting={false}
                enableFullScreenToggle={enableFullScreenToggle}
                enableGlobalFilter={enableSearch}
                enableHiding={enableHiding}
                enablePagination={enablePagination}
                enablePinning={enablePinning}
                enableRowSelection={enableRowSelection}
                enableSorting={enableSorting}
                enableStickyHeader={enableStickyHeader}
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
                state={{pagination, columnFilters, sorting, rowSelection}}
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
        </>
    );
};

export default Table;
