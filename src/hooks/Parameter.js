import {useSearchParams} from 'next/navigation';

const Parameter = () => {
    const searchParams = useSearchParams();

    const get = name => searchParams.get(name);

    return {get};
};

export default Parameter;
