import {useContext, useEffect, useState} from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {ErrorContext} from '@/context/ErrorProvider';
import {validator} from '@/helper/validator';

const Dropdown = props => {
    const {label, onChange, options, value, rules, group, name, disabled} = props;

    const {setError, clearError} = useContext(ErrorContext);
    const error = validator(rules, value ? value.toString() : '');

    const [newValue, setNewValue] = useState(null);

    useEffect(() => {
        const val = options.find(option => option.value === value);
        setNewValue(val || null);
    }, [value]);

    useEffect(() => {
        if (!group && !name) return;
        if (!error.status) return clearError(group, name);

        setError(group, name, error.message);
    }, [value]);

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
                disabled={disabled}
                onChange={(e, value) => onChange(value.value)}
                options={options.length ? options : []}
                renderInput={params => renderInput(params)}
                size="small"
                value={newValue}
                renderOption={(props, option) => renderOptions(props, option)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
            />
        </Box>
    );
};

export default Dropdown;
