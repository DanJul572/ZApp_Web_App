import axios from 'axios';

const get = (url, params) => {
    return new Promise((resolve, reject) => {
        url = process.env.apiUrl + url;

        axios
            .get(url, {params})
            .then(res => resolve(res.data))
            .catch(error => reject(error.response ? error.response.data : error.message));
    });
};

const post = (url, body) => {
    return new Promise((resolve, reject) => {
        url = process.env.apiUrl + url;

        axios
            .post(url, body)
            .then(res => resolve(res.data))
            .catch(error => reject(error.response ? error.response.data : error.message));
    });
};

const request = {
    get,
    post,
};

export default request;
