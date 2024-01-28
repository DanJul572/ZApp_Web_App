import {deleteCookie} from 'cookies-next';

const logout = () => {
    deleteCookie('tree');
    deleteCookie('token');
};

const auth = {
    logout: logout,
};

export default auth;
