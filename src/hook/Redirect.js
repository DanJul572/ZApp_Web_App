import {useRouter} from 'next/navigation';

const Redirect = () => {
    const {push} = useRouter();

    const internal = path => {
        push(path);
    };

    const external = path => {
        window.location.href = path;
    };

    const externalNewTab = path => {
        window.open(path, '_blank');
    };

    return {internal, external, externalNewTab};
};

export default Redirect;
