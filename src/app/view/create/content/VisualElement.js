import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import CVisualElement from '@/constant/CVisualElementType';

const VisualElement = props => {
    const {type, properties} = props;

    const content = () => {
        if (type === CVisualElement.divider.value) {
            return <Divider />;
        } else if (type === CVisualElement.text.value) {
            return <Typography fontSize={12}>{properties.label || CVisualElement.text.label}</Typography>;
        }
    };

    return content();
};

export default VisualElement;
