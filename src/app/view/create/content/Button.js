import {Button as MuiButton} from '@mui/material';

import BUTTON_TYPE from '@/constant/BUTTON_TYPE';

const Button = props => {
    const {type, properties} = props;

    const content = () => {
        if (type === BUTTON_TYPE.button.value) {
            return (
                <MuiButton size="small" variant="contained" style={{display: 'block'}}>
                    {properties.label || BUTTON_TYPE.button.label}
                </MuiButton>
            );
        }
    };

    return content();
};

export default Button;
