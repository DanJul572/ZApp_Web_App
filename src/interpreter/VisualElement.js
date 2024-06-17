import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import Translator from '@/hook/Translator';

import Runner from '@/runner';

import CTheme from '@/constant/CTheme';
import CVisualElement from '@/constant/CVisualElementType';

import MapLoop from './shared/MapLoop';

const VisualElement = props => {
    const {type, properties, isBuilder} = props;

    const {getValues} = Runner({isBuilder});
    const {t} = Translator();
    const theme = useTheme();

    const label = getValues(properties.label);
    const loop = getValues(properties.loop);
    const color = properties.color ? properties.color.value : theme.palette.text.primary;
    const size = parseInt(properties.size) || CTheme.font.size.value;
    const bold = properties.textDecoration && properties.textDecoration.bold ? 'bold' : 'normal';
    const italic = properties.textDecoration && properties.textDecoration.italic ? 'italic' : 'normal';
    const underline = properties.textDecoration && properties.textDecoration.underline ? 'underline' : 'none';

    const textComponent = (label, key = null) => {
        const prop = {};
        if (key) prop.key = key;
        return (
            <Typography
                {...prop}
                sx={{
                    color: color,
                    fontWeight: bold,
                    fontStyle: italic,
                    textDecoration: underline,
                }}
                fontSize={size}>
                {label}
            </Typography>
        );
    };

    const content = () => {
        if (type === CVisualElement.divider.value) {
            return <Divider sx={{backgroundColor: color}} />;
        }

        if (type === CVisualElement.text.value) {
            if (loop && Array.isArray(loop)) {
                if (isBuilder) {
                    return <Typography fontSize={CTheme.font.size.value}>{t('empty_content')}</Typography>;
                }

                return (
                    <MapLoop
                        items={loop}
                        render={(item, index) => {
                            const label = getValues(properties.label, item);
                            return textComponent(label, index);
                        }}
                    />
                );
            } else {
                return textComponent(label);
            }
        }
    };

    return content();
};

export default VisualElement;
