import {useEffect} from 'react';

import Box from '@mui/material/Box';

import Runner from '@/runner';
import Vars from '@/hooks/Vars';
import Alert from '@/hooks/Alert';

const Page = props => {
    const {page, isBuilder, children} = props;
    const {runFunction} = Runner();
    const {removeAll} = Vars();
    const {hideAlert} = Alert();

    useEffect(() => {
        if (!isBuilder) {
            if (page && page.onLoad) {
                runFunction(page.onLoad);
            }
        }
        return () => {
            removeAll();
            hideAlert();
        };
    }, []);

    return <Box padding={1}>{children}</Box>;
};

export default Page;
