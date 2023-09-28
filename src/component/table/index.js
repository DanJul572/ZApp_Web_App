'use client';
import React, {useMemo} from 'react';
import {MaterialReactTable} from 'material-react-table';

const data = [
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
];

const Table = () => {
    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name.firstName', //access nested data with dot notation
                header: 'First Name',
                size: 150,
            },
            {
                accessorKey: 'name.lastName',
                header: 'Last Name',
                size: 150,
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
                size: 200,
            },
            {
                accessorKey: 'city',
                header: 'City',
                size: 150,
            },
            {
                accessorKey: 'state',
                header: 'State',
                size: 150,
            },
        ],
        [],
    );

    return <MaterialReactTable columns={columns} data={data} />;
};

export default Table;
