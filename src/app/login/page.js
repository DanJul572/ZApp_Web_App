'use client';

import {setCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

import Link from 'next/link';

import createTheme from '@mui/material/styles/createTheme';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import Empty from '@/layout/Empty';

import Password from '@/component/input/Password';
import ShortText from '@/component/input/ShortText';

import request from '@/helper/request';

import CTheme from '@/constant/CTheme';

const Page = () => {
    const theme = createTheme(CTheme);
    const {push} = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onLogin = () => {
        const body = {
            email: email,
            password: password,
        };

        request
            .post('/auth/login', body, false)
            .then(res => {
                setCookie('token', res.accessToken);
                push('/module');
            })
            .catch(err => {
                console.log({err});
            });
    };

    return (
        <Empty>
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
        </Empty>
    );
};

export default Page;
