import {useEffect} from 'react';

import Box from '@mui/material/Box';

import Alert from '@/hooks/Alert';
import Comp from '@/hooks/Comp';
import Runner from '@/runner';
import Vars from '@/hooks/Vars';

const Page = props => {
    const {page, isBuilder, children} = props;

    const {runFunction} = Runner();
    const {hideAlert} = Alert();

    const vars = Vars();
    const comp = Comp();

    useEffect(() => {
        if (!isBuilder) {
            if (page && page.onLoad) {
                runFunction(page.onLoad);
            }
        }
        return () => {
            vars.removeAll();
            comp.removeAll();
            hideAlert();
        };
    }, []);

    return <Box padding={1}>{children}</Box>;
};

export default Page;
