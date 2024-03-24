import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

const Card = props => {
    const {color, flex, display, children} = props;

    const justifyContent = display && display.horizontal ? display.horizontal.value : 'flex-start';

    let comProps = {};
    if (flex) {
        comProps.display = 'flex';
        comProps.justifyContent = justifyContent;
    }

    return (
        <Box border={1} borderColor={color || grey[300]} borderRadius={1} padding={1}>
            <Box {...comProps}>{children}</Box>
        </Box>
    );
};

export default Card;
