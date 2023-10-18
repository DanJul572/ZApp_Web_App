'use client';
import {Box, Button} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useContext, useState} from 'react';
import ModuleForm from './module_form';
import FieldForm from './field_form';
import {ErrorContext} from '@/context/error_provider';

const CreateModule = () => {
    const {back} = useRouter();

    const [moduleName, setModuleName] = useState(null);
    const [moduleLabel, setModuleLabel] = useState(null);
    const [moduleDescription, setModuleDescription] = useState(null);
    const [fieldRows, setFieldRows] = useState([]);

    const {errors, groupStatus} = useContext(ErrorContext);
    const disabledSaveButton = groupStatus(['moduleForm'], errors);

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
