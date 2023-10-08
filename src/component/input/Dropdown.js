import {Autocomplete, List, TextField} from '@mui/material';

const Dropdown = props => {
    const {label, onChange, options, size, value} = props;

    return (
        <Autocomplete
            onChange={(e, value) => onChange(value)}
            options={options}
            renderInput={params => <TextField {...params} label={label} />}
            size={size}
            value={value}
            renderOption={(props, option) => {
                return (
                    <List {...props} key={option.value}>
                        {option.label}
                    </List>
                );
            }}
        />
    );
};

export default Dropdown;
