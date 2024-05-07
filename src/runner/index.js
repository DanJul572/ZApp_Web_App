import Hooks from '@/hook';
import Script from '@/hook/Script';

import Builder from '@/builder';

const Runner = props => {
    const {isBuilder} = props;

    // eslint-disable-next-line no-unused-vars
    const ZApp = Hooks();

    // eslint-disable-next-line no-unused-vars
    const ZBuilder = Builder();

    // eslint-disable-next-line no-unused-vars
    const ZSQL = (id, isOne = false, obj = null) => {
        if (!isBuilder) {
            const result = Script({id}).val;
            if (isOne) {
                return result && result.length > 0 ? result[0][obj].toString() : 'Data is not found';
            }
            return result;
        } else {
            return 'ZQL cannot run in Builder Mode';
        }
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

    // eslint-disable-next-line no-unused-vars
    const getValues = (data, type, param = null) => {
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
