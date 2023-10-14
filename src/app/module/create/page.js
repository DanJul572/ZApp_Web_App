'use client';
import {Box, Button} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

import ModuleForm from './module_form';
import FieldForm from './field_form';

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
            <ModuleForm
                moduleName={moduleName}
                setModuleName={setModuleName}
                moduleLabel={moduleLabel}
                setModuleLabel={setModuleLabel}
                moduleDescription={moduleDescription}
                setModuleDescription={setModuleDescription}
            />
            <FieldForm />
        </>
    );
};

export default CreateModule;
