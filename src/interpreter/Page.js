import {useEffect} from 'react';

import Comp from '@/hook/Comp';
import Vars from '@/hook/Vars';

import {useFiles} from '@/context/FilesProvider';

import Runner from '@/runner';

const Page = props => {
    const {page, isBuilder, children, isPreview} = props;

    const {runFunction} = Runner({isBuilder});

    const {setFiles} = useFiles();
    const vars = Vars();
    const comp = Comp();

    useEffect(() => {
        if (!isBuilder && !isPreview) {
            if (page && page.onLoad) {
                runFunction(page.onLoad);
            }
        }
        return () => {
            vars.removeAll();
            comp.removeAll();
            setFiles([]);
        };
    }, []);

    return children;
};

export default Page;
