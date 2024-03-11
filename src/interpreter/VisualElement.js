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
    const size = parseInt(properties.size) || 12;
    const bold = properties.textDecoration && properties.textDecoration.bold ? 'bold' : 'normal';
    const italic = properties.textDecoration && properties.textDecoration.italic ? 'italic' : 'normal';
    const underline = properties.textDecoration && properties.textDecoration.underline ? 'underline' : 'none';

    const content = () => {
        if (type === CVisualElement.divider.value) {
            return <Divider />;
        } else if (type === CVisualElement.text.value) {
            return (
                <Typography
                    sx={{color: color, fontWeight: bold, fontStyle: italic, textDecoration: underline}}
                    fontSize={size}>
                    {label}
                </Typography>
            );
        }
    };

    return content();
};

export default VisualElement;
