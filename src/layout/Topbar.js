import {useRouter} from 'next/navigation';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Logout from '@mui/icons-material/Logout';

import auth from '@/helper/auth';

const Topbar = () => {
    const {push} = useRouter();

    const logout = () => {
        auth.logout();
        push('/login');
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
            <Typography variant="h6" noWrap component="div">
                ZApp
            </Typography>
            <IconButton size="small" onClick={logout}>
                <Logout fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default Topbar;
