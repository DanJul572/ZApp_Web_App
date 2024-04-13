import Alert from './Alert';
import Api from './Api';
import Comp from './Comp';
import Loader from './Loader';
import Parameter from './Parameter';
import Redirect from './Redirect';
import Toaster from './Toaster';
import Vars from './Vars';

const Hooks = () => {
    return {
        Alert: Alert(),
        Api: Api(),
        Comp: Comp(),
        Loader: Loader(),
        Parameter: Parameter(),
        Redirect: Redirect(),
        Toaster: Toaster(),
        Vars: Vars(),
    };
};

export default Hooks;
