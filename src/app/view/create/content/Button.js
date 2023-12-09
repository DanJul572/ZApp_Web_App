import CButtonType from '@/constant/CButtonType';

import MuiButton from '@/alias/MuiButton';

const Button = props => {
    const {type, properties, parse} = props;

    const content = () => {
        if (type === CButtonType.button.value) {
            return (
                <MuiButton size="small" variant="contained" sx={{display: 'block'}} disabled={Boolean(parse.disable)}>
                    {properties.label || CButtonType.button.label}
                </MuiButton>
            );
        }
    };

    return content();
};

export default Button;
