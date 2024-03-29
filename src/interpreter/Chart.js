import Bar from '@/component/chart/Bar';
import Line from '@/component/chart/Line';
import Pie from '@/component/chart/Pie';

import CChartType from '@/constant/CChartType';

import Runner from '@/runner';

const Chart = props => {
    const {type, properties} = props;

    const {getValues} = Runner();

    const label = getValues(properties.label, 'js');
    const value = getValues(properties.value, 'js');

    const content = () => {
        if (type === CChartType.bar.value) {
            return <Bar labels={label} values={value} />;
        } else if (type === CChartType.line.value) {
            return <Line labels={label} values={value} />;
        } else if (type === CChartType.pie.value) {
            return <Pie values={value} />;
        }
    };

    return content();
};

export default Chart;
