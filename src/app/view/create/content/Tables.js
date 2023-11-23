import Table from '@/component/table';

import CTableType from '@/constant/CTableType';

import mockColumns from '@/mock/table/columns';
import mockRows from '@/mock/table/rows';

const Tables = props => {
    const {type} = props;

    const content = () => {
        if (type === CTableType.table.value) {
            return <Table columnKey={'id'} columns={mockColumns} rows={mockRows} />;
        }
    };

    return content();
};

export default Tables;
