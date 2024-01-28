import axios from 'axios';
import {getCookie} from 'cookies-next';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const get = (url, params, withAuth = true) => {
    if (withAuth) {
        const token = getCookie('token');
        if (token) {
            headers.Authorization = token;
        }
    }

    return new Promise((resolve, reject) => {
        url = process.env.apiUrl + url;
        const config = {
            params: params,
            headers: headers,
        };
        axios
            .get(url, config)
            .then(res => resolve(res.data))
            .catch(error => reject(error.response ? error.response.data : error.message));
    });
};

const post = (url, body, withAuth = true) => {
    if (withAuth) {
        const token = getCookie('token');
        if (token) {
            headers.Authorization = token;
        }
    }

    return new Promise((resolve, reject) => {
        url = process.env.apiUrl + url;

        axios
            .post(url, body, {
                headers: headers,
            })
            .then(res => resolve(res.data))
            .catch(error => reject(error.response ? error.response.data : error.message));
    });
};

const request = {
    get,
    post,
};

export default request;
