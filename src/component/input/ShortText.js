import {useContext, useEffect} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {ErrorContext} from '@/context/ErrorProvider';
import {validator} from '@/helper/validator';

const ShortText = props => {
    const {label, onChange, value, rules, group, name, disabled, onBlur, placeholder} = props;

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
                onBlur={onBlur ? e => onBlur(e.target.value) : () => {}}
                placeholder={placeholder || null}
            />
        </Box>
    );
};

export default ShortText;
