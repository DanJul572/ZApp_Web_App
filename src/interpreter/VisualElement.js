import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import CVisualElement from '@/constant/CVisualElementType';

import Runner from '@/runner';
import MapLoop from './MapLoop';

const VisualElement = props => {
    const {type, properties, isBuilder} = props;

    const {getValues} = Runner({isBuilder});
    const theme = useTheme();

    const label = getValues(properties.label, 'js');
    const loop = getValues(properties.loop, 'js');
    const color = properties.color ? properties.color.value : theme.palette.text.primary;
    const size = parseInt(properties.size) || 12;
    const bold = properties.textDecoration && properties.textDecoration.bold ? 'bold' : 'normal';
    const italic = properties.textDecoration && properties.textDecoration.italic ? 'italic' : 'normal';
    const underline = properties.textDecoration && properties.textDecoration.underline ? 'underline' : 'none';

    const content = () => {
        if (type === CVisualElement.divider.value) {
            return <Divider sx={{backgroundColor: color}} />;
        } else if (type === CVisualElement.text.value) {
            if (Array.isArray(loop)) {
                if (isBuilder) {
                    return <Typography fontSize={10}>Content is not avalaible</Typography>;
                } else {
                    return (
                        <MapLoop
                            items={loop}
                            render={(item, index) => {
                                return (
                                    <Typography
                                        key={index}
                                        sx={{
                                            color: color,
                                            fontWeight: bold,
                                            fontStyle: italic,
                                            textDecoration: underline,
                                        }}
                                        fontSize={size}>
                                        {getValues(properties.label, 'js', item)}
                                    </Typography>
                                );
                            }}
                        />
                    );
                }
            } else {
                return (
                    <Typography
                        sx={{color: color, fontWeight: bold, fontStyle: italic, textDecoration: underline}}
                        fontSize={size}>
                        {label}
                    </Typography>
                );
            }
        }
    };

    return content();
};

export default VisualElement;
