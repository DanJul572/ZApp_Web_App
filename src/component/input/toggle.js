import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const Toggle = props => {
    const {label, onChange, value, disabled} = props;

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <Switch
                checked={Boolean(value)}
                value={Boolean(value)}
                onChange={() => onChange(!value)}
                disabled={disabled}
                size="small"
            />
        </Box>
    );
};

export default Toggle;
