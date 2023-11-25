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

import {useBuilder} from '@/context/BuilderProvider';

import CInputType from '@/constant/CInputType';

const FieldControl = props => {
    const {type, properties} = props;

    const {vars, setVars} = useBuilder();

    const changeValue = value => {
        setVars({...vars, [properties.name]: value});
    };

    const content = () => {
        if (type === CInputType.shortText.value)
            return (
                <ShortText
                    onChange={changeValue}
                    value={vars[properties.name]}
                    label={properties.label ? eval(properties.label) : CInputType.shortText.label}
                />
            );

        if (type === CInputType.longText.value)
            return (
                <LongText
                    disabled={true}
                    rows={4}
                    label={properties.label ? eval(properties.label) : CInputType.longText.label}
                />
            );

        if (type === CInputType.number.value)
            return <Number disabled={true} label={properties.label ? eval(properties.label) : CInputType.number.label} />;

        if (type === CInputType.toggle.value)
            return <Toggle disabled={true} label={properties.label ? eval(properties.label) : CInputType.toggle.label} />;

        if (type === CInputType.dropdown.value)
            return (
                <Dropdown
                    options={[]}
                    disabled={true}
                    label={properties.label ? eval(properties.label) : CInputType.dropdown.label}
                />
            );

        if (type === CInputType.date.value)
            return <Date disabled={true} label={properties.label ? eval(properties.label) : CInputType.date.label} />;

        if (type === CInputType.time.value)
            return <Time disabled={true} label={properties.label ? eval(properties.label) : CInputType.time.label} />;

        if (type === CInputType.file.value)
            return <File disabled={true} label={properties.label ? eval(properties.label) : CInputType.file.label} />;

        if (type === CInputType.richText.value)
            return (
                <RichText disabled={true} label={properties.label ? eval(properties.label) : CInputType.richText.label} />
            );

        if (type === CInputType.radio.value)
            return (
                <Radio
                    disabled={true}
                    label={properties.label ? eval(properties.label) : CInputType.radio.label}
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
                    disabled={true}
                    label={properties.label ? eval(properties.label) : CInputType.checkbox.label}
                    options={[
                        {label: 'Value 1', value: 1},
                        {label: 'Value 2', value: 2},
                        {label: 'Value 3', value: 3},
                    ]}
                />
            );
    };

    return content();
};

export default FieldControl;
