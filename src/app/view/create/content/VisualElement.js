import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import CVisualElement from '@/constant/CVisualElementType';

import {useBuilder} from '@/context/BuilderProvider';

const VisualElement = props => {
    const {type, properties} = props;

    // eslint-disable-next-line no-unused-vars
    const {vars, setVars} = useBuilder();

    const content = () => {
        if (type === CVisualElement.divider.value) {
            return <Divider />;
        } else if (type === CVisualElement.text.value) {
            return (
                <Typography fontSize={12}>
                    {properties.label ? eval(properties.label) : CVisualElement.text.label}
                </Typography>
            );
        }
    };

    return content();
};

export default VisualElement;
