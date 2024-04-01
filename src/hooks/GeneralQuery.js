import Request from './Request';

const GeneralQuery = () => {
    const {get, post} = Request();

    const create = body => {
        return post('/general/create', body);
    };

    const update = body => {
        return post('/general/update', body);
    };

    const detail = body => {
        return post('/general/detail', body);
    };

    const sql = id => {
        return get('/script/run', {id});
    };

    return {create, detail, update, sql};
};

export default GeneralQuery;
