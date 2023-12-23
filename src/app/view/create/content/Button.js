import {useBuilder} from '@/context/BuilderProvider';

import Box from '@mui/material/Box';
import CButtonType from '@/constant/CButtonType';

import MuiButton from '@/alias/MuiButton';

const Button = props => {
    const {type, properties, getValues} = props;

    const {vars} = useBuilder();

    const displayValue = type => {
        return properties.display && properties.display[type] ? properties.display[type].value : 'flex-start';
    };

    const disable = getValues(properties.disable, 'js', vars);
    const label = getValues(properties.label, 'js', vars);
    const color = properties.color ? properties.color.name : 'primary';
    const display = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: displayValue('horizontal'),
        // justifyContent: displayValue('vertical'),
    };

    const content = () => {
        if (type === CButtonType.button.value) {
            return (
                <Box sx={display}>
                    <MuiButton
                        size="small"
                        variant="contained"
                        sx={{display: 'block'}}
                        disabled={Boolean(disable)}
                        color={color}>
                        {label || CButtonType.button.label}
                    </MuiButton>
                </Box>
            );
        }
    };

    return content();
};

export default Button;
