import {useContext, useEffect} from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {MuiFileInput} from 'mui-file-input';

import {ErrorContext} from '@/context/ErrorProvider';
import {validator} from '@/helper/validator';

const File = props => {
    const {label, onChange, value, rules, name, group, disabled, multiple} = props;

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
            <MuiFileInput
                disabled={disabled}
                error={error.status}
                fullWidth
                helperText={error.message}
                multiple={multiple}
                onChange={onChange}
                size="small"
                value={value}
            />
        </Box>
    );
};

export default File;
