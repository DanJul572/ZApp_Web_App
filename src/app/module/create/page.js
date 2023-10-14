'use client';
import {LongText, ShortText} from '@/component/input';
import {Box, Button, Grid} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const CreateModule = () => {
    const {back} = useRouter();

    const [moduleName, setModuleName] = useState('');
    const [moduleLabel, setModuleLabel] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');

    const onCancel = () => {
        back();
    };

    return (
        <>
            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="contained" size="small">
                    Save
                </Button>
                <Button variant="outlined" size="small" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
            <Box marginTop={2}>
                <Grid container spacing={2}>
                    <Grid item display="flex" flexDirection="column" gap={2} xs={6}>
                        <Box>
                            <ShortText
                                label="Module Name"
                                size="small"
                                onChange={setModuleName}
                                value={moduleName}
                                rules="required|special_character|start_numeric"
                            />
                        </Box>
                        <Box>
                            <ShortText
                                label="Module Label"
                                size="small"
                                onChange={setModuleLabel}
                                value={moduleLabel}
                                rules="required|start_numeric"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <LongText
                            label="Module Description"
                            size="small"
                            onChange={setModuleDescription}
                            value={moduleDescription}
                            rows={4}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default CreateModule;
