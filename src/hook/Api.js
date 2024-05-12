import CApiUrl from '@/constant/CApiUrl';

import Request from './Request';

const Api = () => {
    const {get, post} = Request();

    const create = body => {
        return post(CApiUrl.common.create, body);
    };

    const update = body => {
        return post(CApiUrl.common.update, body);
    };

    const detail = param => {
        return get(CApiUrl.common.detail, param);
    };

    return {create, detail, update};
};

export default Api;
