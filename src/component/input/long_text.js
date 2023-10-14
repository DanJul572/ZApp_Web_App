import Validator from '@/helper/validator';
import {Box, TextField, Typography} from '@mui/material';

const LongText = props => {
    const {label, onChange, value, rows, rules} = props;

    const error = Validator(rules, value);

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <TextField
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={rows}
                value={value || ''}
                error={error.status}
                helperText={error.message}
                onChange={e => onChange(e.target.value)}
            />
        </Box>
    );
};

export default LongText;
