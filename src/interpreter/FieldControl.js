import {useBuilder} from '@/context/BuilderProvider';

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

const FieldControl = props => {
    const {type, properties, getValues} = props;

    const {vars, setVars} = useBuilder();

    const disabled = !Boolean(properties.name);
    const label = getValues(properties.label, 'js', vars);

    const onChange = value => {
        if (properties.name) {
            const newVars = {...vars};
            newVars[properties.name] = value;
            setVars(newVars);
        }
    };

    const content = () => {
        if (type === CInputType.shortText.value)
            return <ShortText value={vars[properties.name]} onChange={onChange} disabled={disabled} label={label || null} />;

        if (type === CInputType.longText.value) return <LongText disabled={disabled} rows={4} label={label || null} />;

        if (type === CInputType.number.value) return <Number disabled={disabled} label={label || null} />;

        if (type === CInputType.toggle.value)
            return <Toggle disabled={disabled} value={vars[properties.name]} onChange={onChange} label={label || null} />;

        if (type === CInputType.dropdown.value) return <Dropdown options={[]} disabled={disabled} label={label || null} />;

        if (type === CInputType.date.value)
            return <Date value="1901-01-01 00:00:01" disabled={disabled} label={label || null} />;

        if (type === CInputType.time.value)
            return <Time value="1901-01-01 00:00:01" disabled={disabled} label={label || null} />;

        if (type === CInputType.file.value) return <File disabled={disabled} label={label || null} />;

        if (type === CInputType.richText.value) return <RichText disabled={disabled} label={label || null} />;

        if (type === CInputType.radio.value)
            return (
                <Radio
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
            return <Datetime value="1901-01-01 00:00:01" disabled={disabled} label={label || null} />;
    };

    return content();
};

export default FieldControl;
