import Alert from './Alert';
import GeneralQuery from './GeneralQuery';
import Loader from './Loader';
import Toaster from './Toaster';
import Vars from './Vars';

const Hooks = () => {
    return {
        Alert: Alert(),
        GeneralQuery: GeneralQuery(),
        Loader: Loader(),
        Toaster: Toaster(),
        Vars: Vars(),
    };
};

export default Hooks;
