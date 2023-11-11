import Checkbox from '@/component/input/Checkbox';
import Date from '@/component/input/Date';
import Dropdown from '@/component/input/Dropdown';
import File from '@/component/input/File';
import LongText from '@/component/input/LongText';
import Number from '@/component/input/Number';
import Radio from '@/component/input/Radio';
import RichText from '@/component/input/RichText';
import ShortText from '@/component/input/ShortText';
import Time from '@/component/input/Time';
import Toggle from '@/component/input/Toggle';

import INPUT_TYPE from '@/constant/INPUT_TYPE';

const FieldControl = props => {
    const {type, properties} = props;

    const content = () => {
        if (type === INPUT_TYPE.shortText.value) {
            return <ShortText disabled={true} label={properties.label || INPUT_TYPE.shortText.label} />;
        } else if (type === INPUT_TYPE.longText.value) {
            return <LongText disabled={true} rows={4} label={properties.label || INPUT_TYPE.longText.label} />;
        } else if (type === INPUT_TYPE.number.value) {
            return <Number disabled={true} label={properties.label || INPUT_TYPE.number.label} />;
        } else if (type === INPUT_TYPE.toggle.value) {
            return <Toggle disabled={true} label={properties.label || INPUT_TYPE.toggle.label} />;
        } else if (type === INPUT_TYPE.dropdown.value) {
            return <Dropdown options={[]} disabled={true} label={properties.label || INPUT_TYPE.dropdown.label} />;
        } else if (type === INPUT_TYPE.date.value) {
            return <Date disabled={true} label={properties.label || INPUT_TYPE.date.label} />;
        } else if (type === INPUT_TYPE.time.value) {
            return <Time disabled={true} label={properties.label || INPUT_TYPE.time.label} />;
        } else if (type === INPUT_TYPE.file.value) {
            return <File disabled={true} label={properties.label || INPUT_TYPE.file.label} />;
        } else if (type === INPUT_TYPE.richText.value) {
            return <RichText disabled={true} label={properties.label || INPUT_TYPE.richText.label} />;
        } else if (type === INPUT_TYPE.radio.value) {
            return (
                <Radio
                    disabled={true}
                    label={properties.label || INPUT_TYPE.radio.label}
                    options={[
                        {label: 'Value 1', value: 1},
                        {label: 'Value 2', value: 2},
                        {label: 'Value 3', value: 3},
                    ]}
                />
            );
        } else if (type === INPUT_TYPE.checkbox.value) {
            return (
                <Checkbox
                    disabled={true}
                    label={properties.label || INPUT_TYPE.checkbox.label}
                    options={[
                        {label: 'Value 1', value: 1},
                        {label: 'Value 2', value: 2},
                        {label: 'Value 3', value: 3},
                    ]}
                />
            );
        }
    };

    return content();
};

export default FieldControl;
