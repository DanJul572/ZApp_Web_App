import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {PieChart} from '@mui/x-charts/PieChart';

import CTheme from '@/constant/CTheme';

const Pie = props => {
    const {values} = props;

    const renderChart = () => {
        if (!values || !values.length)
            return (
                <Typography fontSize={CTheme.font.size.value} fontWeight="bold">
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

    return <Container sx={{padding: 0}}>{renderChart()}</Container>;
};

export default Pie;
