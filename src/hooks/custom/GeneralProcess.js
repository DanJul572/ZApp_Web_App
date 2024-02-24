import Hooks from '..';

const GeneralProcess = () => {
    const ZApp = Hooks();

    const createOrUpdate = (moduleId, path = null) => {
        ZApp.Loader.showLoading();

        const id = ZApp.Parameter.get('id');

        if (!id) {
            ZApp.GeneralQuery.create({
                moduleId: moduleId,
                data: ZApp.Vars.getAll(),
            })
                .then(res => {
                    ZApp.Alert.showSuccessAlert(res);
                    ZApp.Vars.removeAll();
                    ZApp.Loader.hideLoading();

                    if (path) {
                        ZApp.Redirect.internal(path);
                    }
                })
                .catch(err => {
                    ZApp.Alert.showErrorAlert(err);
                    ZApp.Loader.hideLoading();
                });
        } else {
            ZApp.GeneralQuery.update({
                moduleId: moduleId,
                rowId: id,
                data: ZApp.Vars.getAll(),
            })
                .then(res => {
                    ZApp.Alert.showSuccessAlert(res);
                    ZApp.Vars.removeAll();
                    ZApp.Loader.hideLoading();

                    if (path) {
                        ZApp.Redirect.internal(path);
                    }
                })
                .catch(err => {
                    ZApp.Alert.showErrorAlert(err);
                    ZApp.Loader.hideLoading();
                });
        }
    };

    const findOneAndSet = moduleId => {
        const id = ZApp.Parameter.get('id');
        if (id) {
            ZApp.Loader.showLoading();
            ZApp.GeneralQuery.detail({
                moduleId: moduleId,
                rowId: id,
            })
                .then(res => {
                    ZApp.Vars.changeVar('text', res.text);
                })
                .catch(err => {
                    ZApp.Alert.showErrorAlert(err);
                })
                .finally(() => {
                    ZApp.Loader.hideLoading();
                });
        }
    };

    return {createOrUpdate, findOneAndSet};
};

export default GeneralProcess;
