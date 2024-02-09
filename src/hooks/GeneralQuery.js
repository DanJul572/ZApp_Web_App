import Request from './Request';

const GeneralQuery = () => {
    const {post} = Request();

    const create = body => {
        return post('/general/create', body);
    };

    return {create};
};

export default GeneralQuery;
