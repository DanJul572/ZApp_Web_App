import {ErrorContext} from '@/context/error_provider';
import {validator} from '@/helper/validator';
import {Box, TextField, Typography} from '@mui/material';
import {useContext, useEffect} from 'react';

const Number = props => {
    const {label, onChange, value, rows, rules, name, group, disabled} = props;

    const {setError, clearError} = useContext(ErrorContext);

    const error = validator(rules, value ? value : '');

    useEffect(() => {
        if (!group && !name) return;
        if (!error.status) return clearError(group, name);
        setError(group, name, error.message);
    }, [value]);

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <TextField
                variant="outlined"
                size="small"
                fullWidth
                rows={rows}
                value={value || ''}
                error={error.status}
                helperText={error.message}
                onChange={e => onChange(e.target.value.replace(/[^0-9]/g, ''))}
                disabled={disabled}
            />
        </Box>
    );
};

export default Number;
