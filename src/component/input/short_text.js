import Validator from '@/helper/validator';
import {Box, TextField, Typography} from '@mui/material';

const ShortText = props => {
    const {label, onChange, value, rules} = props;

    const error = Validator(rules, value);

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={value}
                error={error.status}
                helperText={error.message}
                onChange={e => onChange(e.target.value)}
            />
        </Box>
    );
};

export default ShortText;
