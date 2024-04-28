import {useEffect} from 'react';

import Comp from '@/hooks/Comp';
import Vars from '@/hooks/Vars';

import Runner from '@/runner';

const Page = props => {
    const {page, isBuilder, children} = props;

    const {runFunction} = Runner();

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
        };
    }, []);

    return children;
};

export default Page;
