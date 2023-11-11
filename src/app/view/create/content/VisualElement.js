import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import VISUAL_ELEMENT_TYPE from '@/constant/VISUAL_ELEMENT_TYPE';

const VisualElement = props => {
    const {type, properties} = props;

    const content = () => {
        if (type === VISUAL_ELEMENT_TYPE.divider.value) {
            return <Divider />;
        } else if (type === VISUAL_ELEMENT_TYPE.text.value) {
            return <Typography fontSize={12}>{properties.label || VISUAL_ELEMENT_TYPE.text.label}</Typography>;
        }
    };

    return content();
};

export default VisualElement;
