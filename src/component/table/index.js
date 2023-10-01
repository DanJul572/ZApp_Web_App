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
import {Delete, Download, Edit, Info, Storage} from '@mui/icons-material';
import {action_type, export_type, extention_type, input_type} from '@/constant';
import {Dropdown} from '@/component/input';
import AdvanceFilter from './advance_filter';
import query_format_type from '@/constant/query_format_type';

const Table = props => {
    const {
        action = [],
        advanceFilterFormat = query_format_type.sql.value,
        columnKey,
        columnPinning = {},
        columns = [],
        customToolbarAction = [],
        enableAdvanceFilter = false,
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
        onAdvanceFilter,
        onChangePage,
        onDelete,
        onDownload,
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
    const [rowSelection, setRowSelection] = useState([]);
    const [openExportDialog, setOpenExportDialog] = useState(false);
    const [openAdvanceFilterDialog, setOpenAdvanceFilterDialog] = useState(false);
    const [exportSelectionType, setExportSelectionType] = useState(null);
    const [exportExtentionType, setExportExtentionType] = useState(null);

    const initialState = {
        density: 'compact',
        pagination: pagination,
        columnPinning: columnPinning,
    };
    const muiTableContainerProps = {sx: {maxHeight: '500px'}};
    const muiTablePaginationProps = {rowsPerPageOptions: [10]};
    const export_row_type = [
        {value: export_type.selected.value, label: export_type.selected.label},
        {value: export_type.current.value, label: export_type.current.label},
        {value: export_type.all.value, label: export_type.all.label},
    ];
    const export_row_extention = [
        {
            value: extention_type.excel.value,
            label: extention_type.excel.label,
        },
        {value: extention_type.pdf.value, label: extention_type.pdf.label},
        {value: extention_type.text.value, label: extention_type.text.label},
    ];

    const exportButton = (
        <Tooltip arrow title="Download">
            <IconButton onClick={() => setOpenExportDialog(true)}>
                <Download />
            </IconButton>
        </Tooltip>
    );

    const advanceFilterButton = (
        <Tooltip arrow title="Advance Filter">
            <IconButton onClick={() => setOpenAdvanceFilterDialog(true)}>
                <Storage />
            </IconButton>
        </Tooltip>
    );

    const exportDialog = (
        <Dialog open={openExportDialog}>
            <DialogContent
                style={{
                    width: '20rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                <Dropdown
                    type={input_type.dropdown.value}
                    label="Selection"
                    options={export_row_type}
                    onChange={setExportSelectionType}
                    value={exportSelectionType}
                />
                <Dropdown
                    type={input_type.dropdown.value}
                    label="Extention"
                    options={export_row_extention}
                    onChange={setExportExtentionType}
                    value={exportExtentionType}
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={() => setOpenExportDialog(false)}>
                    Cancel
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                        onDownload({
                            selection: exportSelectionType.value,
                            extention: exportExtentionType.value,
                        })
                    }
                    variant="contained">
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    );

    const displayColumnDefOptions = () => {
        if (!action.length && !action.filter(item => item.type !== action_type.insert.value).length)
            return false;
        return {
            'mrt-row-actions': {
                size: 120,
            },
        };
    };

    const toolbarAction = () => {
        if (!action.length || !action.find(item => item.type === action_type.insert.value)) return;
        return (
            <Box
                sx={{
                    display: 'flex',
                    gap: '1rem',
                    p: '0.5rem',
                    flexWrap: 'wrap',
                }}>
                <Button color="primary" onClick={onAdd} variant="contained" size="small">
                    Create New Data
                </Button>
                {customToolbarAction.map(action => action)}
            </Box>
        );
    };

    const isSupportAction = () => {
        return action.filter(item => item.type !== action_type.insert.value).length ? true : false;
    };

    const actionButton = row => {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {isSupportAction() &&
                    action.find(item => item.type === action_type.insert.value) && (
                        <IconButton onClick={() => onUpdate(row.original)} size="small">
                            <Edit fontSize="11" />
                        </IconButton>
                    )}
                {isSupportAction() &&
                    action.find(item => item.type === action_type.insert.value) && (
                        <IconButton onClick={() => onDelete(row.original)} size="small">
                            <Delete fontSize="11" />
                        </IconButton>
                    )}
                {isSupportAction() &&
                    action.find(item => item.type === action_type.detail.value) && (
                        <IconButton onClick={() => onDelete(row.original)} size="small">
                            <Info fontSize="11" />
                        </IconButton>
                    )}
            </Box>
        );
    };

    const toolbarComponent = table => {
        return (
            <Box>
                {enableSearch && <MRT_ToggleGlobalFilterButton table={table} />}
                {enableFilter && <MRT_ToggleFiltersButton table={table} />}
                {enableAdvanceFilter && advanceFilterButton}
                {enableHiding && <MRT_ShowHideColumnsButton table={table} />}
                {enableDensityToggle && <MRT_ToggleDensePaddingButton table={table} />}
                {enableFullScreenToggle && <MRT_FullScreenToggleButton table={table} />}
                {exportButton}
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
                renderToolbarInternalActions={({table}) => toolbarComponent(table)}
                rowCount={rowCount}
                state={{pagination, columnFilters, sorting, rowSelection}}
            />
            {exportDialog}
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
        </>
    );
};

export default Table;
