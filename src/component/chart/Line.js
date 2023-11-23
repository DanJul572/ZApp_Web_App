import Container from '@mui/material/Container';

import {LineChart} from '@mui/x-charts/LineChart';

const Line = () => {
    return (
        <Container style={{padding: 0}}>
            <LineChart
                xAxis={[{data: [1, 2, 3, 5, 8, 10]}]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                height={250}
            />
        </Container>
    );
};

export default Line;
