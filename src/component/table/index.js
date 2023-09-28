'use client';
import React, {useEffect, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {Box, Button, IconButton} from '@mui/material';
import {Delete, Edit, Info} from '@mui/icons-material';

const Table = props => {
    const {
        action, // insert, update, delete
        columnKey,
        columnPinning = {left: [], right: []},
        columns = [],
        customToolbarAction = [],
        enableDensityToggle = false,
        enableFilter = false,
        enableFullScreenToggle = false,
        enableHiding = false,
        enablePagination = false,
        enableRowSelection = false,
        enableSearch = false,
        enableSorting = false,
        onAdd,
        onChangePage,
        onDelete,
        onFilter,
        onSearch,
        onSelect,
        onSort,
        onUpdate,
        pageCount = 0,
        rowCount = 0,
        rows = [],
    } = props;

    const [pagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: pageCount,
    });
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({});

    const initialState = () => {
        return {
            density: 'compact',
            pagination: pagination,
            columnPinning: columnPinning,
        };
    };

    const muiTableContainerProps = () => {
        return {sx: {maxHeight: '500px'}};
    };

    const muiTablePaginationProps = () => {
        return {rowsPerPageOptions: [10]};
    };

    const displayColumnDefOptions = () => {
        if (!action.length && !action.filter(item => item !== 'insert').length)
            return false;
        return {
            'mrt-row-actions': {
                size: 120,
            },
        };
    };

    const toolbarAction = () => {
        if (!action.length || !action.find(item => item === 'insert')) return;
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
        return action.filter(item => item !== 'insert').length ? true : false;
    };

    const actionButton = row => {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {isSupportAction() &&
                    action.find(item => item === 'update') && (
                        <IconButton onClick={() => onUpdate(row.original)}>
                            <Edit />
                        </IconButton>
                    )}
                {isSupportAction() &&
                    action.find(item => item === 'delete') && (
                        <IconButton onClick={() => onDelete(row.original)}>
                            <Delete />
                        </IconButton>
                    )}
                {isSupportAction() &&
                    action.find(item => item === 'detail') && (
                        <IconButton onClick={() => onDelete(row.original)}>
                            <Info />
                        </IconButton>
                    )}
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
        <MaterialReactTable
            columns={columns}
            data={rows}
            displayColumnDefOptions={displayColumnDefOptions()}
            enableColumnActions={false}
            enableColumnFilters={enableFilter}
            enableColumnResizing={true}
            enableDensityToggle={enableDensityToggle}
            enableEditing={isSupportAction}
            enableFilterMatchHighlighting={false}
            enableFullScreenToggle={enableFullScreenToggle}
            enableGlobalFilter={enableSearch}
            enableHiding={enableHiding}
            enablePagination={enablePagination}
            enablePinning={true}
            enableRowSelection={enableRowSelection}
            enableSorting={enableSorting}
            enableStickyHeader={true}
            getRowId={row => row[columnKey]}
            initialState={initialState()}
            manualFiltering
            manualPagination
            manualSorting
            muiTableContainerProps={muiTableContainerProps()}
            muiTablePaginationProps={muiTablePaginationProps()}
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={onSearch}
            onPaginationChange={setPagination}
            onRowSelectionChange={setRowSelection}
            onSortingChange={setSorting}
            pageCount={pageCount}
            positionActionsColumn="last"
            renderRowActions={({row}) => actionButton(row)}
            renderTopToolbarCustomActions={toolbarAction}
            rowCount={rowCount}
            state={{pagination, columnFilters, sorting, rowSelection}}
        />
    );
};

export default Table;
