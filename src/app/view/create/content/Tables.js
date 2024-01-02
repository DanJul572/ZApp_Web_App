import Table from '@/component/table';

import CTableType from '@/constant/CTableType';

const Tables = props => {
    const {type} = props;

    const columns = [
        {
            accessorKey: 'column1',
            header: 'Column 1',
            size: 100,
            minSize: 100,
            maxSize: 200,
        },
        {
            accessorKey: 'column2',
            header: 'Column 2',
            size: 100,
            minSize: 100,
            maxSize: 200,
        },
        {
            accessorKey: 'column3',
            header: 'Column 3',
            size: 100,
            minSize: 100,
            maxSize: 200,
        },
        {
            accessorKey: 'column4',
            header: 'Column 4',
            size: 100,
            minSize: 100,
            maxSize: 200,
        },
    ];

    const rows = [
        {
            column1: '...',
            column2: '...',
            column3: '...',
            column4: '...',
        },
    ];

    const content = () => {
        if (type === CTableType.table.value) {
            return <Table columnKey={'id'} columns={columns} rows={rows} />;
        }
    };

    return content();
};

export default Tables;
