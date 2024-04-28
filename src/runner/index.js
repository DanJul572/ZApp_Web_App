import Hooks from '@/hooks';
import Script from '@/hooks/Script';

import Builder from '@/builder';

const Runner = () => {
    // eslint-disable-next-line no-unused-vars
    const ZApp = Hooks();

    // eslint-disable-next-line no-unused-vars
    const ZBuilder = Builder();

    // eslint-disable-next-line no-unused-vars
    const ZSQL = (id, isOne = false, obj = null) => {
        const result = Script({id}).val;
        if (isOne) {
            return result ? result[0][obj].toString() : false;
        }
        return result;
    };

    // eslint-disable-next-line no-unused-vars
    const runFunction = (func, param) => {
        try {
            eval(func);
        } catch (error) {
            console.log(`Error : ${error.message}`);
            return;
        }
    };

    const getValues = (data, type) => {
        if (!data || !type) return null;
        try {
            if (typeof data === 'object') {
                if (!data.isBind) return data.value;
                if (type === 'json') return data.value ? JSON.parse(data.value) : {};
                return data.value ? eval(data.value) : null;
            } else {
                if (type === 'json') return data ? JSON.parse(data) : {};
                return data ? eval(data) : null;
            }
        } catch (error) {
            console.log(`Error : ${error.message}`);
            return type === 'json' ? {} : null;
        }
    };

    return {runFunction, getValues};
};

export default Runner;
