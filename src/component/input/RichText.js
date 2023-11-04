import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import dynamic from 'next/dynamic';

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

const RichText = props => {
    const {label, disabled, onChange, defaultValue} = props;

    return (
        <Box>
            <Typography fontSize={12}>{label}</Typography>
            <SunEditor defaultValue={defaultValue} disable={disabled} onChange={onChange} />
        </Box>
    );
};

export default RichText;
