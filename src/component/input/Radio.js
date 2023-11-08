import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

const CustomRadio = props => {
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
                            <Radio
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

export default CustomRadio;
