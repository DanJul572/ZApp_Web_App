import {ShortText, LongText} from '@/component/input';
import {Box, Grid, colors} from '@mui/material';

const ModuleForm = props => {
    const {
        moduleName,
        setModuleName,
        moduleLabel,
        setModuleLabel,
        moduleDescription,
        setModuleDescription,
    } = props;

    return (
        <Box marginY={2} border={1} padding={2} borderRadius={1} borderColor={colors.grey[300]}>
            <Grid container spacing={2}>
                <Grid item display="flex" flexDirection="column" gap={2} xs={6}>
                    <ShortText
                        label="Module Name"
                        size="small"
                        onChange={setModuleName}
                        value={moduleName}
                        rules="required|special_character|start_numeric"
                    />
                    <ShortText
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
