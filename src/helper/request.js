import axios from 'axios';
import {useRouter} from 'next/navigation';
import {getCookie} from 'cookies-next';

import auth from './auth';

const Request = () => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const {push} = useRouter();

    const forceRedirect = () => {
        auth.logout();
        push('/login');
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
                .catch(error => {
                    const message = error.response ? error.response.data : error.message;
                    if (withAuth && error.response.status === 401) {
                        forceRedirect();
                        return;
                    }
                    reject(message);
                });
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
                .catch(error => {
                    const message = error.response ? error.response.data : error.message;
                    if (withAuth && error.response.status === 401) {
                        forceRedirect();
                        return;
                    }
                    reject(message);
                });
        });
    };

    return {
        get: get,
        post: post,
    };
};

export default Request;
