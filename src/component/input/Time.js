import {useContext, useState} from 'react';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers';

import {ErrorContext} from '@/context/ErrorProvider';
import {validator} from '@/helper/validator';

const Time = props => {
    const {label, onChange, value, rules, name, group, disabled} = props;

    const {setError, clearError} = useContext(ErrorContext);

    const error = validator(rules, value ? value : '');

    useState(() => {
        if (!group && !name) return;
        if (!error.status) return clearError(group, name);
        setError(group, name, error.message);
    }, [value]);

    const valueFormater = val => {
        const time = dayjs(val).format('1901-01-01THH:mm:ss');
        return onChange(time);
    };

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    value={dayjs(value)}
                    onChange={valueFormater}
                    disabled={disabled}
                    format="H:m:s"
                    slotProps={{
                        textField: {
                            disabled: disabled,
                            error: error.status,
                            fullWidth: true,
                            helperText: error.message,
                            size: 'small',
                        },
                    }}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default Time;
