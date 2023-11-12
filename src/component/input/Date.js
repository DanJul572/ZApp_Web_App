import {useContext, useState} from 'react';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {ErrorContext} from '@/context/ErrorProvider';
import {validator} from '@/helper/validator';

const Date = props => {
    const {label, onChange, value, rules, name, group, disabled} = props;

    const {setError, clearError} = useContext(ErrorContext);

    const error = validator(rules, value ? value : '');

    useState(() => {
        if (!group && !name) return;
        if (!error.status) return clearError(group, name);
        setError(group, name, error.message);
    }, [value]);

    const valueFormater = val => {
        const date = dayjs(val).format('YYYY-MM-DDT00:00:00');
        return onChange(date);
    };

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={dayjs(value)}
                    onChange={valueFormater}
                    disabled={disabled}
                    format="DD/MM/YYYY"
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

export default Date;
