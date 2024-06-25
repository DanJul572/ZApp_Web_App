import axios from 'axios';
import {getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';

import auth from '../helper/auth';

import CApiUrl from '@/constant/CApiUrl';

const Request = () => {
    const apiUrl = process.env.NEXT_PUBLIC_ENV_API_URL || CApiUrl.base;
    const headers = {
        Accept: 'application/json',
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
            const config = {
                params: params,
                headers: headers,
            };
            axios
                .get(apiUrl + url, config)
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

    const post = (url, body, withAuth = true, files = []) => {
        if (withAuth) {
            const token = getCookie('token');
            if (token) {
                headers.Authorization = token;
            }
        }

        const formData = new FormData();

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i].file, files[i].id);
            }
        }
        formData.append('data', JSON.stringify(body));

        return new Promise((resolve, reject) => {
            axios
                .post(apiUrl + url, formData, {
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
        get,
        post,
    };
};

export default Request;
