import input_size_type from '@/constant/input_size_type';
import {Autocomplete, TextField} from '@mui/material';

const Dropdown = props => {
    const {
        id = null,
        label = null,
        onChange,
        options = [],
        size = input_size_type.small.value,
        value = null,
    } = props;

    return (
        <Autocomplete
            id={id}
            onChange={(e, value) => onChange(value)}
            options={options}
            renderInput={params => <TextField {...params} label={label} />}
            size={size}
            value={value}
        />
    );
};

export default Dropdown;
