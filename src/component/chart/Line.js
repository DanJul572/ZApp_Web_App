import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {LineChart} from '@mui/x-charts/LineChart';

import CTheme from '@/constant/CTheme';

const Line = props => {
    const {labels, values} = props;

    const renderChart = () => {
        if (!labels || !labels.length || !values || !values.length)
            return (
                <Typography fontSize={CTheme.font.size.value} fontWeight="bold">
                    Chart cannot be loaded.
                </Typography>
            );

        return (
            <LineChart
                xAxis={[{data: labels}]}
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

export default Line;
