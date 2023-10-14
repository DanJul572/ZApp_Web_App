import Validator from '@/helper/validator';
import {Autocomplete, Box, List, TextField, Typography} from '@mui/material';

const Dropdown = props => {
    const {label, onChange, options, value, rules} = props;

    const error = Validator(rules, value ? value.value.toString() : '');

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
        <Box>
            <Autocomplete
                onChange={(e, value) => onChange(value)}
                options={options.length ? options : []}
                renderInput={params => renderInput(params)}
                size="small"
                value={value}
                renderOption={(props, option) => renderOptions(props, option)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
            />
        </Box>
    );
};

export default Dropdown;
