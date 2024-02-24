import Box from '@mui/material/Box';
import CButtonType from '@/constant/CButtonType';

import MuiButton from '@/alias/MuiButton';

import Runner from '@/runner';

const Button = props => {
    const {runFunction, getValues} = Runner();

    const {type, properties} = props;

    const displayValue = type => {
        return properties.display && properties.display[type] ? properties.display[type].value : 'flex-start';
    };

    const color = properties.color ? properties.color.name : 'primary';
    const disable = getValues(properties.disable, 'js');
    const display = {display: 'flex', flexDirection: 'column', alignItems: displayValue('horizontal')};
    const hidden = getValues(properties.hidden, 'js');
    const label = getValues(properties.label, 'js');
    const onClick = properties.onClick;

    const content = () => {
        if (type === CButtonType.button.value) {
            return (
                <Box sx={display}>
                    <MuiButton
                        onClick={() => runFunction(onClick)}
                        size="small"
                        variant="contained"
                        sx={{display: hidden ? 'none' : 'block'}}
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
