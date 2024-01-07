import Bar from '@/component/chart/Bar';
import Line from '@/component/chart/Line';
import Pie from '@/component/chart/Pie';

import CChartType from '@/constant/CChartType';

const Chart = props => {
    const {type} = props;

    const content = () => {
        if (type === CChartType.bar.value) {
            return <Bar labels={['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4']} values={[2, 4, 3, 1]} />;
        } else if (type === CChartType.line.value) {
            return <Line labels={[1, 2, 3, 5, 8, 10]} values={[2, 5.5, 2, 8.5, 1.5, 5]} />;
        } else if (type === CChartType.pie.value) {
            return (
                <Pie
                    values={[
                        {id: 0, value: 10, label: 'series A'},
                        {id: 1, value: 15, label: 'series B'},
                        {id: 2, value: 20, label: 'series C'},
                    ]}
                />
            );
        }
    };

    return content();
};

export default Chart;
