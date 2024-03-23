import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

const Card = props => {
    const {color, children} = props;

    return (
        <Box border={1} borderColor={color || grey[300]} borderRadius={1} padding={1}>
            <Box>{children}</Box>
        </Box>
    );
};

export default Card;
