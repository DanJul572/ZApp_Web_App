import Checkbox from '@/component/input/Checkbox';
import Date from '@/component/input/Date';
import Datetime from '@/component/input/Datetime';

import Dropdown from '@/component/input/Dropdown';
import File from '@/component/input/File';
import LongText from '@/component/input/LongText';
import Number from '@/component/input/Number';
import Radio from '@/component/input/Radio';
import RichText from '@/component/input/RichText';
import ShortText from '@/component/input/ShortText';
import Time from '@/component/input/Time';
import Toggle from '@/component/input/Toggle';

import CInputType from '@/constant/CInputType';

import Vars from '@/hooks/Vars';
import Runner from '@/runner';

const FieldControl = props => {
    const {isBuilder, type, properties} = props;

    const {getValues} = Runner();
    const {set, get} = Vars();

    const disabled = !Boolean(properties.name) || getValues(properties.disable, 'js');
    const label = getValues(properties.label, 'js');
    const hidden = getValues(properties.hidden, 'js');

    const onChange = value => {
        if (!isBuilder) {
            if (properties.name) {
                set(properties.name, value);
            }
        }
    };

    const comProps = {
        value: get(properties.name) || null,
        onChange: onChange,
        disabled: disabled,
        label: label || null,
    };

    const content = () => {
        if (!hidden) {
            if (type === CInputType.shortText.value) {
                return <ShortText {...comProps} />;
            } else if (type === CInputType.longText.value) {
                return <LongText {...comProps} rows={4} />;
            } else if (type === CInputType.number.value) {
                return <Number {...comProps} />;
            } else if (type === CInputType.toggle.value) {
                return <Toggle {...comProps} />;
            } else if (type === CInputType.dropdown.value) {
                return <Dropdown {...comProps} options={[]} />;
            } else if (type === CInputType.date.value) {
                return <Date {...comProps} />;
            } else if (type === CInputType.time.value) {
                return <Time {...comProps} />;
            } else if (type === CInputType.file.value) {
                return <File {...comProps} />;
            } else if (type === CInputType.richText.value) {
                return <RichText {...comProps} />;
            } else if (type === CInputType.radio.value) {
                return (
                    <Radio
                        {...comProps}
                        options={[
                            {label: 'Value 1', value: 1},
                            {label: 'Value 2', value: 2},
                            {label: 'Value 3', value: 3},
                        ]}
                    />
                );
            } else if (type === CInputType.checkbox.value) {
                return (
                    <Checkbox
                        {...comProps}
                        options={[
                            {label: 'Value 1', value: 1},
                            {label: 'Value 2', value: 2},
                            {label: 'Value 3', value: 3},
                        ]}
                    />
                );
            } else if (type === CInputType.datetime.value) {
                return <Datetime {...comProps} />;
            }
        }
    };

    return content();
};

export default FieldControl;
