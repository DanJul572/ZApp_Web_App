const CApiUrl = {
    base: 'http://127.0.0.1:8080/api',
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        register: '/auth/register',
    },
    general: {
        columns: '/general/columns',
        create: '/general/create',
        delete: '/general/delete',
        detail: '/general/detail',
        menu: '/general/menu',
        rows: '/general/rows',
        options: '/general/options',
        update: '/general/update',
    },
    module: {
        create: '/module/create',
        delete: '/module/delete',
    },
    script: {
        run: '/script/run',
    },
};

export default CApiUrl;
