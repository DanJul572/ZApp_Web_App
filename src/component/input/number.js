import {validator} from '@/helper/validator';
import {Box, TextField, Typography} from '@mui/material';

const Number = props => {
    const {label, onChange, value, rows, rules} = props;

    const error = validator(rules, value ? value : '');

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
            />
        </Box>
    );
};

export default Number;
