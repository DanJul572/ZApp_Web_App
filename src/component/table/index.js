'use client';
import React, {useEffect, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {Box, Button, IconButton} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';

const Table = props => {
    const {
        action, // insert, update, delete
        columnKey,
        columns = [],
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
        onSelect,
        onSearch,
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

    const actionColumn = () => {
        if (!action.length && !action.filter(item => item !== 'insert').length)
            return false;
        return {
            'mrt-row-actions': {
                muiTableHeadCellProps: {
                    align: 'center',
                },
                size: 120,
            },
        };
    };

    const insertButton = () => {
        if (!action.length && !action.find(item => item === 'insert')) return;
        return (
            <Button color="primary" onClick={onAdd} variant="contained">
                Create New Data
            </Button>
        );
    };

    const isSupportAction = () => {
        return action.filter(item => item !== 'insert').length ? true : false;
    };

    const actionButton = row => {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {action.length && action.find(item => item === 'update') && (
                    <IconButton onClick={() => onUpdate(row.original)}>
                        <Edit />
                    </IconButton>
                )}
                {action.length && action.find(item => item === 'delete') && (
                    <IconButton onClick={() => onDelete(row.original)}>
                        <Delete />
                    </IconButton>
                )}
            </Box>
        );
    };

    useEffect(() => {
        if (enablePagination) onChangePage(pagination.pageIndex);
    }, [pagination]);

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
            displayColumnDefOptions={actionColumn}
            enableColumnActions={false}
            enableColumnFilters={enableFilter}
            enableDensityToggle={enableDensityToggle}
            enableEditing={isSupportAction}
            enableFilterMatchHighlighting={false}
            enableFullScreenToggle={enableFullScreenToggle}
            enableGlobalFilter={enableSearch}
            enableHiding={enableHiding}
            enablePagination={enablePagination}
            enableRowSelection={enableRowSelection}
            enableSorting={enableSorting}
            getRowId={row => row[columnKey]}
            manualFiltering
            manualPagination
            manualSorting
            muiTablePaginationProps={{rowsPerPageOptions: [10]}}
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={onSearch}
            onPaginationChange={setPagination}
            onRowSelectionChange={setRowSelection}
            onSortingChange={setSorting}
            pageCount={pageCount}
            positionActionsColumn="last"
            renderRowActions={({row}) => actionButton(row)}
            renderTopToolbarCustomActions={insertButton}
            rowCount={rowCount}
            state={{pagination, columnFilters, sorting, rowSelection}}
        />
    );
};

export default Table;
