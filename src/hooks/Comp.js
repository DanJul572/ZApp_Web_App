import {useComponent} from '@/context/ComponentProvider';

const Comp = () => {
    const {comp, setComp} = useComponent({});

    const removeAll = () => {
        setComp(null);
    };

    const set = (name, value) => {
        const newComp = {...comp};
        newComp[name] = value;
        setComp(newComp);
    };

    const setAll = obj => {
        setComp(obj);
    };

    const get = name => {
        return comp ? comp[name] : null;
    };

    const getAll = () => {
        return comp;
    };

    return {get, getAll, set, removeAll, setAll};
};

export default Comp;
