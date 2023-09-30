'use client';
import React, {useEffect, useState} from 'react';
import {
    MaterialReactTable,
    MRT_ToggleFiltersButton,
    MRT_ToggleGlobalFilterButton,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_FullScreenToggleButton,
} from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Tooltip,
} from '@mui/material';
import {Delete, Download, Edit, Info} from '@mui/icons-material';
import {action_type} from '@/constant';

const Table = props => {
    const {
        action = [],
        columnKey,
        columnPinning = {},
        columns = [],
        customToolbarAction = [],
        enableColumnResizing = false,
        enableDensityToggle = false,
        enableFilter = false,
        enableFullScreenToggle = false,
        enableHiding = false,
        enablePagination = false,
        enablePinning = false,
        enableRowSelection = false,
        enableSearch = false,
        enableSorting = false,
        enableStickyHeader = false,
        onAdd,
        onChangePage,
        onDelete,
        onFilter,
        onSearch,
        onSelect,
        onSort,
        onUpdate,
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
    const [rowSelection, setRowSelection] = useState({});
    const [openExportDialog, setOpenExportDialog] = useState(false);

    const initialState = {
        density: 'compact',
        pagination: pagination,
        columnPinning: columnPinning,
    };
    const muiTableContainerProps = {sx: {maxHeight: '500px'}};
    const muiTablePaginationProps = {rowsPerPageOptions: [10]};

    const displayColumnDefOptions = () => {
        if (
            !action.length &&
            !action.filter(item => item.type !== action_type.insert.value)
                .length
        )
            return false;
        return {
            'mrt-row-actions': {
                size: 120,
            },
        };
    };

    const toolbarAction = () => {
        if (
            !action.length ||
            !action.find(item => item.type === action_type.insert.value)
        )
            return;
        return (
            <Box
                sx={{
                    display: 'flex',
                    gap: '1rem',
                    p: '0.5rem',
                    flexWrap: 'wrap',
                }}>
                <Button
                    color="primary"
                    onClick={onAdd}
                    variant="contained"
                    size="small">
                    Create New Data
                </Button>
                {customToolbarAction.map(action => action)}
            </Box>
        );
    };

    const isSupportAction = () => {
        return action.filter(item => item.type !== action_type.insert.value)
            .length
            ? true
            : false;
    };

    const actionButton = row => {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {isSupportAction() &&
                    action.find(
                        item => item.type === action_type.insert.value,
                    ) && (
                        <IconButton
                            onClick={() => onUpdate(row.original)}
                            size="small">
                            <Edit fontSize="11" />
                        </IconButton>
                    )}
                {isSupportAction() &&
                    action.find(
                        item => item.type === action_type.insert.value,
                    ) && (
                        <IconButton
                            onClick={() => onDelete(row.original)}
                            size="small">
                            <Delete fontSize="11" />
                        </IconButton>
                    )}
                {isSupportAction() &&
                    action.find(
                        item => item.type === action_type.detail.value,
                    ) && (
                        <IconButton
                            onClick={() => onDelete(row.original)}
                            size="small">
                            <Info fontSize="11" />
                        </IconButton>
                    )}
            </Box>
        );
    };

    const exportDialog = () => {
        return (
            <Dialog open={openExportDialog}>
                <DialogContent></DialogContent>
                <DialogActions sx={{padding: '1.5rem'}}>
                    <Button
                        size="small"
                        onClick={() => setOpenExportDialog(false)}>
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {}}
                        variant="contained">
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const exportButton = () => {
        return (
            <Tooltip arrow title="Download">
                <IconButton onClick={() => setOpenExportDialog(true)}>
                    <Download />
                </IconButton>
            </Tooltip>
        );
    };

    const toolbarComponent = table => {
        return (
            <Box>
                {enableSearch && <MRT_ToggleGlobalFilterButton table={table} />}
                {enableFilter && <MRT_ToggleFiltersButton table={table} />}
                {enableHiding && <MRT_ShowHideColumnsButton table={table} />}
                {enableDensityToggle && (
                    <MRT_ToggleDensePaddingButton table={table} />
                )}
                {enableFullScreenToggle && (
                    <MRT_FullScreenToggleButton table={table} />
                )}
                {exportButton()}
            </Box>
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
                renderRowActions={({row}) => actionButton(row)}
                renderTopToolbarCustomActions={toolbarAction}
                renderToolbarInternalActions={({table}) =>
                    toolbarComponent(table)
                }
                rowCount={rowCount}
                state={{pagination, columnFilters, sorting, rowSelection}}
            />
            {exportDialog()}
        </>
    );
};

export default Table;
