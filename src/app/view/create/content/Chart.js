import Bar from '@/component/chart/Bar';
import CChartType from '@/constant/CChartType';

const Chart = props => {
    const {type} = props;

    const content = () => {
        if (type === CChartType.bar.value) {
            return <Bar labels={['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4']} values={[2, 4, 3, 1]} />;
        }
    };

    return content();
};

export default Chart;
