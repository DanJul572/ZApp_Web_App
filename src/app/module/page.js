'use client';
import Table from '@/component/table';
import mock_columns from '@/mock/module/columns';
import mock_rows from '@/mock/module/rows';

export default function Module() {
    return (
        <div>
            <Table
                action={['insert', 'update', 'delete', 'detail']}
                columnKey={'id'}
                columns={mock_columns}
                enableFilter={true}
                enableHiding={true}
                enablePagination={true}
                enableRowSelection={true}
                enableSearch={true}
                enableSorting={true}
                onAdd={() => {}}
                onChangePage={val => console.log(val)}
                onDelete={val => console.log(val)}
                onFilter={val => console.log(val)}
                onSearch={val => console.log(val)}
                onSelect={val => console.log(val)}
                onSort={val => console.log(val)}
                onUpdate={val => console.log(val)}
                pageCount={1}
                rowCount={1}
                rows={mock_rows}
            />
        </div>
    );
}
