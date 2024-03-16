import Alert from './Alert';
import Comp from './Comp';
import GeneralQuery from './GeneralQuery';
import Loader from './Loader';
import Parameter from './Parameter';
import Redirect from './Redirect';
import Toaster from './Toaster';
import Vars from './Vars';

const Hooks = () => {
    return {
        Alert: Alert(),
        Comp: Comp(),
        GeneralQuery: GeneralQuery(),
        Loader: Loader(),
        Parameter: Parameter(),
        Redirect: Redirect(),
        Toaster: Toaster(),
        Vars: Vars(),
    };
};

export default Hooks;
