'use client';

import {useState} from 'react';

import Alert from '@/component/alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import Loading from '@/component/loading';

import THEME from '@/constant/THEME';

import Sidebar from './Sidebar';

export default function Main({children}) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = createTheme(THEME);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <Loading />
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        top: 0,
                        left: 0,
                        right: 0,
                    }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            ZApp
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        marginLeft: 37,
                    }}>
                    <Toolbar />
                    <Alert />
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
