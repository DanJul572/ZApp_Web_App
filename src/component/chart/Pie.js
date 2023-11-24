import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {PieChart} from '@mui/x-charts/PieChart';

const Pie = props => {
    const {values} = props;

    const renderChart = () => {
        if (!values || !values.length)
            return (
                <Typography fontSize={12} fontWeight="bold">
                    Chart cannot be loaded.
                </Typography>
            );

        return (
            <PieChart
                series={[
                    {
                        data: values,
                    },
                ]}
                height={250}
            />
        );
    };

    return <Container style={{padding: 0}}>{renderChart()}</Container>;
};

export default Pie;
