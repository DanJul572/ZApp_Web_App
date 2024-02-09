import {useBuilder} from '@/context/BuilderProvider';

const Vars = () => {
    const {vars, setVars} = useBuilder({});

    const removeAll = () => {
        setVars(null);
    };

    const changeVar = (name, value) => {
        const newVars = {...vars};
        newVars[name] = value;
        setVars(newVars);
    };

    const get = name => vars[name];

    const getAll = () => vars;

    return {get, getAll, changeVar, removeAll};
};

export default Vars;
