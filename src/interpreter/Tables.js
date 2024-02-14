import Typography from '@mui/material/Typography';

import ClassicView from '@/templates/ClassicView';

import Runner from '@/runner';

import CTableType from '@/constant/CTableType';

const Tables = props => {
    const {type, properties, isBuilder} = props;

    const {getValues} = Runner();

    const moduleID = getValues(properties.moduleID, 'js');

    const content = () => {
        if (!moduleID) return false;

        if (isBuilder) return <Typography fontWeight="bold">TABLE COMPONENT CANNOT SHOW IN BUILDER MODE.</Typography>;

        if (type === CTableType.table.value) {
            return <ClassicView moduleID={moduleID} />;
        }
    };

    return content();
};

export default Tables;
