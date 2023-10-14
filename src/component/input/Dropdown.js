import Validator from '@/helper/validator';
import {Autocomplete, List, TextField, Typography} from '@mui/material';

const Dropdown = props => {
    const {label, onChange, options, size, value, rules} = props;

    const error = Validator(rules, value ? value.value : '');

    const renderInput = params => {
        return (
            <>
                <Typography fontSize={12}>{label}</Typography>
                <TextField {...params} error={error.status} helperText={error.message} />
            </>
        );
    };

    const renderOptions = (props, option) => {
        return (
            <List {...props} key={option.value}>
                {option.label}
            </List>
        );
    };

    return (
        <>
            <Autocomplete
                onChange={(e, value) => onChange(value)}
                options={options}
                renderInput={params => renderInput(params)}
                size={size}
                value={value}
                renderOption={(props, option) => renderOptions(props, option)}
            />
        </>
    );
};

export default Dropdown;
