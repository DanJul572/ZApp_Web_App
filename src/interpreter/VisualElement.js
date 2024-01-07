import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import {useBuilder} from '@/context/BuilderProvider';

import CVisualElement from '@/constant/CVisualElementType';

const VisualElement = props => {
    const {type, properties, getValues} = props;

    const theme = useTheme();
    const {vars} = useBuilder();

    const label = getValues(properties.label, 'js', vars);
    const color = properties.color ? properties.color.value : theme.palette.text.primary;

    const content = () => {
        if (type === CVisualElement.divider.value) {
            return <Divider />;
        } else if (type === CVisualElement.text.value) {
            return (
                <Typography sx={{color: color}} fontSize={12}>
                    {label}
                </Typography>
            );
        }
    };

    return content();
};

export default VisualElement;
