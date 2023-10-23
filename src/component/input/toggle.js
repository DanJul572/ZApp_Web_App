import {Box, Switch, Typography} from '@mui/material';

const Toggle = props => {
    const {label, onChange, value, disabled} = props;

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <Switch checked={value} value={value} onChange={() => onChange(!value)} disabled={disabled} size="small" />
        </Box>
    );
};

export default Toggle;
