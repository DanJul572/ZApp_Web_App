import Validator from '@/helper/validator';
import {TextField, Typography} from '@mui/material';

const ShortText = props => {
    const {label, onChange, size, value, rules} = props;

    const error = Validator(rules, value);

    return (
        <>
            <Typography fontSize={12}>{label}</Typography>
            <TextField
                variant="outlined"
                size={size}
                fullWidth
                value={value}
                error={error.status}
                helperText={error.message}
                onChange={e => onChange(e.target.value)}
            />
        </>
    );
};

export default ShortText;
