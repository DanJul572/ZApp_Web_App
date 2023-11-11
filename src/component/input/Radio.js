import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

import MuiRadio from '@/alias/MuiRadio';

const Radio = props => {
    const {value, label, options, disabled, onChange} = props;

    const renderOptions = () => {
        if (!options || !options.length) return false;

        return (
            <RadioGroup row>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option.value}
                        control={
                            <MuiRadio
                                checked={value === option.value}
                                disabled={disabled}
                                onChange={e => onChange(e.target.value)}
                                size="small"
                            />
                        }
                        label={option.label}
                        slotProps={{typography: {fontSize: 12}}}
                    />
                ))}
            </RadioGroup>
        );
    };

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            {renderOptions()}
        </Box>
    );
};

export default Radio;
