import axios from 'axios';
import {getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';

import auth from '../helper/auth';

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
            url = process.env.NEXT_PUBLIC_ENV_API_URL + url;
            const config = {
                params: params,
                headers: headers,
            };
            axios
                .get(url, config)
                .then(res => resolve(res.data))
                .catch(error => {
                    const message = error.response ? error.response.data : error.message;
                    const status = error.response.status;
                    if (withAuth && (status === 401 || status === 403)) {
                        forceRedirect();
                        reject(message);
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
            url = process.env.NEXT_PUBLIC_ENV_API_URL + url;

            axios
                .post(url, body, {
                    headers: headers,
                })
                .then(res => resolve(res.data))
                .catch(error => {
                    const message = error.response ? error.response.data : error.message;
                    const status = error.response.status;
                    if (withAuth && (status === 401 || status === 403)) {
                        forceRedirect();
                        reject(message);
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
