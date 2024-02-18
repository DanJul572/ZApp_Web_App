import {Box} from '@mui/material';

import Runner from '@/runner';
import {useEffect} from 'react';

const Page = props => {
    const {page, isBuilder, children} = props;
    const {runFunction} = Runner();

    useEffect(() => {
        if (!isBuilder) {
            if (page && page.onLoad) {
                runFunction(page.onLoad);
            }
        }
    }, []);

    return <Box padding={1}>{children}</Box>;
};

export default Page;
