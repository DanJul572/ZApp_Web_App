import {useContext, useEffect, useState} from 'react';

import {ErrorContext} from '@/context/ErrorProvider';
import {validator} from '@/helper/validator';

import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Password = props => {
    const {label, onChange, value, rules, group, name, disabled, onBlur} = props;

    const {setError, clearError} = useContext(ErrorContext);

    const [showPassword, setShowPassword] = useState(false);

    const error = validator(rules, value);

    const handleClickShowPassword = () => {
        setShowPassword(show => !show);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    useEffect(() => {
        if (!group && !name) return;
        if (!error.status) return clearError(group, name);
        setError(group, name, error.message);
    }, [value]);

    return (
        <FormControl variant="outlined" fullWidth>
            <Typography fontSize={12}>{label}</Typography>
            <OutlinedInput
                disabled={disabled}
                variant="outlined"
                size="small"
                fullWidth
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                onBlur={onBlur ? e => onBlur(e.target.value) : () => {}}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default Password;
