import Alert from './Alert';
import GeneralQuery from './GeneralQuery';
import Loader from './Loader';
import Redirect from './Redirect';
import Toaster from './Toaster';
import Vars from './Vars';

const Hooks = () => {
    return {
        Alert: Alert(),
        GeneralQuery: GeneralQuery(),
        Loader: Loader(),
        Redirect: Redirect(),
        Toaster: Toaster(),
        Vars: Vars(),
    };
};

export default Hooks;
