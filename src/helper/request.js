import axios from 'axios';

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
    post,
};

export default request;
