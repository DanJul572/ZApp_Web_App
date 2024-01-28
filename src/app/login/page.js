'use client';

import {setCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

import {useLoading} from '@/context/LoadingProvider';
import {useToast} from '@/context/ToastProvider';

import Link from 'next/link';

import createTheme from '@mui/material/styles/createTheme';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import Password from '@/component/input/Password';
import ShortText from '@/component/input/ShortText';

import Request from '@/helper/request';

import CTheme from '@/constant/CTheme';

const Page = () => {
    const theme = createTheme(CTheme);
    const {post} = Request();

    const {push} = useRouter();
    const {setLoading} = useLoading();
    const {setToast} = useToast();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onLogin = () => {
        setLoading(true);

        const body = {
            email: email,
            password: password,
        };

        post('/auth/login', body, false)
            .then(res => {
                setCookie('token', res.accessToken);
                push('/module');
            })
            .catch(err => {
                setToast({
                    status: true,
                    type: 'error',
                    message: err,
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Box
                width={450}
                border={1}
                borderColor={grey[300]}
                borderRadius={1}
                padding={2}
                display="flex"
                flexDirection="column">
                <Box marginBottom={3} display="flex" flexDirection="column" gap={1}>
                    <ShortText label="Email" value={email} onChange={setEmail} />
                    <Password label="Password" value={password} onChange={setPassword} />
                </Box>
                <Button variant="contained" onClick={onLogin}>
                    LOGIN
                </Button>
                <Box display="flex" justifyContent="flex-end" marginTop={2}>
                    <Typography sx={{fontSize: 'small'}}>
                        Don't Have An Account ?{' '}
                        <Link href="/register" style={{color: theme.palette.primary.main}}>
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Page;
