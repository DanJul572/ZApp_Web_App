import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import CVisualElement from '@/constant/CVisualElementType';

import Runner from '@/runner';

const VisualElement = props => {
    const {getValues} = Runner();

    const {type, properties} = props;

    const theme = useTheme();

    const label = getValues(properties.label, 'js');
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
