import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';

import LongText from '@/component/input/LongText';
import ShortText from '@/component/input/ShortText';

const ModuleForm = props => {
    const {moduleName, setModuleName, moduleLabel, setModuleLabel, moduleDescription, setModuleDescription} = props;

    return (
        <Box marginY={2} border={1} padding={2} borderRadius={1} borderColor={grey[300]}>
            <Grid container spacing={2}>
                <Grid item display="flex" flexDirection="column" gap={2} xs={6}>
                    <ShortText
                        group="moduleForm"
                        name="moduleName"
                        label="Module Name"
                        size="small"
                        onChange={setModuleName}
                        value={moduleName}
                        rules="required|field_name"
                    />
                    <ShortText
                        group="moduleForm"
                        name="moduleLabel"
                        label="Module Label"
                        size="small"
                        onChange={setModuleLabel}
                        value={moduleLabel}
                        rules="required|start_numeric"
                    />
                </Grid>
                <Grid item xs={6}>
                    <LongText
                        label="Module Description"
                        size="small"
                        onChange={setModuleDescription}
                        value={moduleDescription}
                        rows={6}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ModuleForm;
