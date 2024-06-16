import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';

import LongText from '@/component/input/LongText';
import ShortText from '@/component/input/ShortText';

import CTheme from '@/constant/CTheme';

const ModuleForm = props => {
    const {moduleName, setModuleName, moduleLabel, setModuleLabel, moduleDescription, setModuleDescription} = props;

    return (
        <Box marginY={2} border={CTheme.border.size.value} padding={2} borderRadius={1} borderColor={grey[300]}>
            <Grid container="true" spacing={2}>
                <Grid item display="flex" flexDirection="column" gap={2} xs={6}>
                    <ShortText label="Module Name" onChange={setModuleName} value={moduleName} />
                    <ShortText label="Module Label" onChange={setModuleLabel} value={moduleLabel} />
                </Grid>
                <Grid item xs={6}>
                    <LongText
                        label="Module Description"
                        onChange={setModuleDescription}
                        rows={6}
                        value={moduleDescription}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ModuleForm;
