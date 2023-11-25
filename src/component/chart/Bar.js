import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {BarChart} from '@mui/x-charts/BarChart';

const Bar = props => {
    const {labels, values} = props;

    const renderChart = () => {
        if (!labels || !labels.length || !values || !values.length)
            return (
                <Typography fontSize={12} fontWeight="bold">
                    Chart cannot be loaded.
                </Typography>
            );

        return (
            <BarChart
                xAxis={[
                    {
                        data: labels,
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: values,
                    },
                ]}
                height={250}
            />
        );
    };

    return <Container sx={{padding: 0}}>{renderChart()}</Container>;
};

export default Bar;
