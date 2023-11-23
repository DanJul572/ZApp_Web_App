import Container from '@mui/material/Container';

import {PieChart} from '@mui/x-charts/PieChart';

const Pie = () => {
    return (
        <Container style={{padding: 0}}>
            <PieChart
                series={[
                    {
                        data: [
                            {id: 0, value: 10},
                            {id: 1, value: 15},
                            {id: 2, value: 20},
                        ],
                    },
                ]}
                height={250}
            />
        </Container>
    );
};

export default Pie;
