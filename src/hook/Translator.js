import i18next from 'i18next';

import en from '@/language/en';
import id from '@/language/id';

const Translator = () => {
    const init = () => {
        i18next.init({
            lng: process.env.NEXT_PUBLIC_ENV_LANGUAGE || 'en',
            debug: false,
            resources: {
                en: {
                    translation: en,
                },
                id: {
                    translation: id,
                },
            },
        });
    };

    const t = key => {
        return i18next.t(key);
    };

    return {
        init,
        t,
    };
};

export default Translator;
