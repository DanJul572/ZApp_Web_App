import {useContext, useEffect, useState} from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {ErrorContext} from '@/context/ErrorProvider';
import {validator} from '@/helper/validator';

import Request from '@/hook/Request';

import CApiUrl from '@/constant/CApiUrl';
import CTheme from '@/constant/CTheme';

const Dropdown = props => {
    const {label, onChange, options, value, rules, group, name, disabled, id} = props;

    const {get} = Request();

    const {setError, clearError} = useContext(ErrorContext);
    const error = validator(rules, value ? value.toString() : '');

    const [newValue, setNewValue] = useState(null);
    const [newOptions, setNewOptions] = useState([]);

    const getOptions = () => {
        get(CApiUrl.common.options, {id: id}, false).then(res => {
            setNewOptions(res);
        });
    };

    useEffect(() => {
        if (id) {
            getOptions();
        } else {
            setNewOptions(options || []);
        }
    }, []);

    useEffect(() => {
        const val = newOptions.find(option => option.value === value);
        setNewValue(val || null);
    }, [value]);

    useEffect(() => {
        if (!group && !name) return;
        if (!error.status) return clearError(group, name);

        setError(group, name, error.message);
    }, [value]);

    const renderInput = params => {
        return (
            <Box>
                <Typography fontSize={CTheme.font.size.value}>{label}</Typography>
                <TextField {...params} error={error.status} helperText={error.message} />
            </Box>
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
                onChange={(e, value) => onChange(value ? value.value : null)}
                options={newOptions.length ? newOptions : []}
                renderInput={params => renderInput(params)}
                size={CTheme.field.size.name}
                value={newValue}
                renderOption={(props, option) => renderOptions(props, option)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
            />
        </Box>
    );
};

export default Dropdown;
