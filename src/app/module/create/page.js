'use client';

import {useContext, useState} from 'react';
import {useRouter} from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FieldForm from './FieldForm';
import ModuleForm from './ModuleForm';

import {ErrorContext} from '@/context/ErrorProvider';

const CreateModule = () => {
    const {back} = useRouter();

    const [moduleName, setModuleName] = useState(null);
    const [moduleLabel, setModuleLabel] = useState(null);
    const [moduleDescription, setModuleDescription] = useState(null);
    const [fieldRows, setFieldRows] = useState([]);

    const {errors, groupError} = useContext(ErrorContext);
    const disabledSaveButton = groupError(['moduleForm'], errors);

    const onCancel = () => {
        back();
    };

    return (
        <>
            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="contained" size="small" disabled={disabledSaveButton}>
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
            <FieldForm fieldRows={fieldRows} setFieldRows={setFieldRows} />
        </>
    );
};

export default CreateModule;
