import {Box, CardContent} from '@mui/material';
import {Card as Cards} from '@mui/material';

const Card = props => {
    const {children} = props;
    return (
        <Cards variant="outlined">
            <CardContent>
                <Box>{children}</Box>
            </CardContent>
        </Cards>
    );
};

export default Card;
