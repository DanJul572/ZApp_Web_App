import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

const Card = props => {
    const {children} = props;
    return (
        <Box border={1} borderColor={grey[300]} borderRadius={1} padding={1}>
            <Box>{children}</Box>
        </Box>
    );
};

export default Card;
