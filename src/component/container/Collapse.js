import {useState} from 'react';

import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import MuiCollapse from '@/alias/MuiCollapse';

const Collapse = props => {
    const {children, label} = props;

    const [open, setOpen] = useState(true);

    return (
        <Box border={1} borderColor={grey[300]} borderRadius={1}>
            <Box
                borderBottom={1}
                borderColor={grey[300]}
                display="flex"
                justifyContent="space-between"
                padding={1}
                sx={{backgroundColor: grey[100]}}>
                <Typography fontSize={12} fontWeight="bold">
                    {label}
                </Typography>
                <IconButton
                    onClick={() => {
                        setOpen(!open);
                    }}
                    size="small"
                    sx={{padding: 0}}>
                    {open ? <KeyboardArrowDown fontSize="12" /> : <KeyboardArrowRight fontSize="12" />}
                </IconButton>
            </Box>
            <MuiCollapse in={open} sx={{padding: 1}}>
                {children}
            </MuiCollapse>
        </Box>
    );
};

export default Collapse;
