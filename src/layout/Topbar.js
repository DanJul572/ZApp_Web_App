import {useRouter} from 'next/navigation';

import {useLoading} from '@/context/LoadingProvider';
import {useToast} from '@/context/ToastProvider';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Logout from '@mui/icons-material/Logout';

import Request from '@/hooks/Request';

import auth from '@/helper/auth';

const Topbar = () => {
    const {post} = Request();

    const {push} = useRouter();
    const {setToast} = useToast();
    const {setLoading} = useLoading();

    const logout = () => {
        setLoading(true);

        post('/auth/logout')
            .then(() => {
                auth.logout();
                push('/login');
            })
            .catch(err => {
                setToast({
                    status: true,
                    message: err,
                    type: 'error',
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
            <Typography variant="h6" noWrap component="div">
                ZApp
            </Typography>
            <IconButton size="small" onClick={logout} color="inherit">
                <Logout fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default Topbar;
