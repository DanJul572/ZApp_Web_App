import Request from './Request';

const GeneralQuery = () => {
    const {post} = Request();

    const create = body => {
        return post('/general/create', body);
    };

    const detail = body => {
        return post('/general/detail', body);
    };

    return {create, detail};
};

export default GeneralQuery;
