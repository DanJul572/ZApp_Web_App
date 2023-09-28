'use client';
import Table from '@/component/table';
import mock_columns from '@/mock/module/columns';
import mock_rows from '@/mock/module/rows';

export default function Module() {
    const onAdd = () => {
        console.log('add');
    };

    const onUpdate = val => {
        console.log(val);
    };

    const onDelete = val => {
        console.log(val);
    };

    const onSearch = val => {
        console.log(val);
    };

    const onChangePage = val => {
        console.log(val);
    };

    return (
        <div>
            <Table
                columnKey={'id'}
                action={['insert', 'update', 'delete']}
                rows={mock_rows}
                columns={mock_columns}
                pageCount={5}
                rowCount={25}
                onAdd={onAdd}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onSearch={onSearch}
                onChangePage={onChangePage}
                enableSearch={true}
                enablePagination={true}
            />
        </div>
    );
}
