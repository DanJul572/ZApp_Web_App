import {Box, CardContent, Typography} from '@mui/material';
import {Card as Cards} from '@mui/material';

const Card = props => {
    const {children, label} = props;
    return (
        <Cards variant="outlined">
            <CardContent>
                <Typography fontSize={15} fontWeight="bold">
                    {label}
                </Typography>
                <Box>{children}</Box>
            </CardContent>
        </Cards>
    );
};

export default Card;
