import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

import CTheme from '@/constant/CTheme';

const Card = props => {
    const {color, flex, display, children, padding, border} = props;

    const justifyContent = display && display.horizontal ? display.horizontal.value : 'flex-start';

    let comProps = {};
    if (flex) {
        comProps.display = 'flex';
        comProps.justifyContent = justifyContent;
        comProps.gap = 1;
    }

    return (
        <Box border={border || CTheme.border.size.value} borderColor={color || grey[300]} borderRadius={1}>
            <Box {...comProps} padding={padding || 1}>
                {children}
            </Box>
        </Box>
    );
};

export default Card;
