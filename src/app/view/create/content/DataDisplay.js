import Table from '@/component/table';
import Bar from '@/component/chart/Bar';

import CDataDisplayType from '@/constant/CDataDisplayType';

import mockColumns from '@/mock/table/columns';
import mockRows from '@/mock/table/rows';

const DataDisplay = props => {
    const {type} = props;

    const content = () => {
        if (type === CDataDisplayType.table.value) {
            return <Table columnKey={'id'} columns={mockColumns} rows={mockRows} />;
        } else if (type === CDataDisplayType.chart.value) {
            return <Bar labels={['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4']} values={[2, 4, 3, 1]} />;
        }
    };

    return content();
};

export default DataDisplay;
