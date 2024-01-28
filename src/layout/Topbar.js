import {useRouter} from 'next/navigation';

import {useToast} from '@/context/ToastProvider';
import {useLoading} from '@/context/LoadingProvider';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Logout from '@mui/icons-material/Logout';

import auth from '@/helper/auth';
import Request from '@/helper/request';

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
            <IconButton size="small" onClick={logout}>
                <Logout fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default Topbar;
