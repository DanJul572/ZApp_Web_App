import CApiUrl from '@/constant/CApiUrl';

import Request from './Request';

const GeneralQuery = () => {
    const {get, post} = Request();

    const create = body => {
        return post(CApiUrl.general.create, body);
    };

    const update = body => {
        return post(CApiUrl.general.update, body);
    };

    const detail = body => {
        return post(CApiUrl.general.detail, body);
    };

    const sql = id => {
        return get(CApiUrl.script.run, {id});
    };

    return {create, detail, update, sql};
};

export default GeneralQuery;
