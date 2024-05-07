import CApiUrl from '@/constant/CApiUrl';

import useRequest from './Request';

const Api = () => {
    const {get, post} = useRequest();

    const create = body => {
        return post(CApiUrl.general.create, body);
    };

    const update = body => {
        return post(CApiUrl.general.update, body);
    };

    const detail = param => {
        return get(CApiUrl.general.detail, param);
    };

    const sql = id => {
        return get(CApiUrl.script.run, {id});
    };

    return {create, detail, update, sql};
};

export default Api;
