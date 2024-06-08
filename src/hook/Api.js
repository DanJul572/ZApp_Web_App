import CApiUrl from '@/constant/CApiUrl';

import {useFiles} from '@/context/FilesProvider';

import Request from './Request';

const Api = () => {
    const {get, post} = Request();
    const {files} = useFiles();

    const create = body => {
        return post(CApiUrl.common.create, body, true, files);
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
