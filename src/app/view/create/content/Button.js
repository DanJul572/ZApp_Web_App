import {useBuilder} from '@/context/BuilderProvider';

import CButtonType from '@/constant/CButtonType';

import MuiButton from '@/alias/MuiButton';

const Button = props => {
    const {type, properties, getValues} = props;

    const {vars} = useBuilder();

    const disable = getValues(properties.disable, 'js', vars);
    const label = getValues(properties.label, 'js', vars);

    const content = () => {
        if (type === CButtonType.button.value) {
            return (
                <MuiButton size="small" variant="contained" sx={{display: 'block'}} disabled={Boolean(disable)}>
                    {label || CButtonType.button.label}
                </MuiButton>
            );
        }
    };

    return content();
};

export default Button;
