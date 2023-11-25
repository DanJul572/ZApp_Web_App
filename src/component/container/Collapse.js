import {useState} from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import useTheme from '@mui/material/styles/useTheme';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import MuiCollapse from '@/alias/MuiCollapse';

const Collapse = props => {
    const {children, label, sx} = props;

    const theme = useTheme();

    const [open, setOpen] = useState(true);

    const getStyles = () => {
        return sx ? {...sx, padding: 1} : {padding: 1};
    };

    return (
        <Box border={1} borderColor={theme.palette.primary.main} borderRadius={1}>
            <Box
                borderBottom={1}
                borderColor={theme.palette.primary.main}
                display="flex"
                justifyContent="space-between"
                padding={1}
                sx={{backgroundColor: theme.palette.primary.main}}>
                <Typography
                    fontSize={12}
                    fontWeight="bold"
                    color={theme.palette.getContrastText(theme.palette.primary.main)}>
                    {label}
                </Typography>
                <IconButton
                    onClick={() => {
                        setOpen(!open);
                    }}
                    size="small"
                    sx={{padding: 0}}>
                    {open ? (
                        <KeyboardArrowDown
                            fontSize="small"
                            sx={{color: theme.palette.getContrastText(theme.palette.primary.main)}}
                        />
                    ) : (
                        <KeyboardArrowRight fontSize="small" />
                    )}
                </IconButton>
            </Box>
            <MuiCollapse in={open} sx={getStyles()}>
                {children}
            </MuiCollapse>
        </Box>
    );
};

export default Collapse;
