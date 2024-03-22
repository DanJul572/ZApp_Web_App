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

    const onChange = value => {
        if (!isBuilder) {
            if (properties.name) {
                set(properties.name, value);
            }
        }
    };

    const content = () => {
        if (type === CInputType.shortText.value)
            return (
                <ShortText
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                />
            );

        if (type === CInputType.longText.value)
            return (
                <LongText
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    rows={4}
                    label={label || null}
                />
            );

        if (type === CInputType.number.value)
            return (
                <Number
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                />
            );

        if (type === CInputType.toggle.value)
            return (
                <Toggle
                    disabled={disabled}
                    value={get(properties.name) || null}
                    onChange={onChange}
                    label={label || null}
                />
            );

        if (type === CInputType.dropdown.value)
            return (
                <Dropdown
                    value={get(properties.name) || null}
                    onChange={onChange}
                    options={[]}
                    disabled={disabled}
                    label={label || null}
                />
            );

        if (type === CInputType.date.value)
            return (
                <Date
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                />
            );

        if (type === CInputType.time.value)
            return (
                <Time
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                />
            );

        if (type === CInputType.file.value)
            return (
                <File
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                />
            );

        if (type === CInputType.richText.value)
            return (
                <RichText
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                />
            );

        if (type === CInputType.radio.value)
            return (
                <Radio
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                    options={[
                        {label: 'Value 1', value: 1},
                        {label: 'Value 2', value: 2},
                        {label: 'Value 3', value: 3},
                    ]}
                />
            );

        if (type === CInputType.checkbox.value)
            return (
                <Checkbox
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                    options={[
                        {label: 'Value 1', value: 1},
                        {label: 'Value 2', value: 2},
                        {label: 'Value 3', value: 3},
                    ]}
                />
            );

        if (type === CInputType.datetime.value)
            return (
                <Datetime
                    value={get(properties.name) || null}
                    onChange={onChange}
                    disabled={disabled}
                    label={label || null}
                />
            );
    };

    return content();
};

export default FieldControl;
