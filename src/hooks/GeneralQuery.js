import Request from './Request';

const GeneralQuery = () => {
    const {post} = Request();

    const create = body => {
        return post('/general/create', body);
    };

    const update = body => {
        return post('/general/update', body);
    };

    const detail = body => {
        return post('/general/detail', body);
    };

    return {create, detail, update};
};

export default GeneralQuery;
