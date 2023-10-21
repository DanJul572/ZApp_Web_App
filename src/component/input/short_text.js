import {ErrorContext} from '@/context/error_provider';
import {validator} from '@/helper/validator';
import {Box, TextField, Typography} from '@mui/material';
import {useContext, useEffect} from 'react';

const ShortText = props => {
    const {label, onChange, value, rules, group, name, disabled} = props;

    const {setError, clearError} = useContext(ErrorContext);

    const error = validator(rules, value);

    useEffect(() => {
        if (!group && !name) return;
        if (!error.status) return clearError(group, name);
        setError(group, name, error.message);
    }, [value]);

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <TextField
                disabled={disabled}
                variant="outlined"
                size="small"
                fullWidth
                value={value || ''}
                error={error.status}
                helperText={error.message}
                onChange={e => onChange(e.target.value)}
            />
        </Box>
    );
};

export default ShortText;
