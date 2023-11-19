'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FieldForm from './FieldForm';
import ModuleForm from './ModuleForm';

import {useLoading} from '@/context/LoadingProvider';
import {post} from '@/helper/request';

const CreateModule = () => {
    const {back} = useRouter();

    const {setLoading} = useLoading();

    const [moduleName, setModuleName] = useState(null);
    const [moduleLabel, setModuleLabel] = useState(null);
    const [moduleDescription, setModuleDescription] = useState(null);
    const [fieldRows, setFieldRows] = useState([]);

    const onCancel = () => {
        back();
    };

    const onSave = () => {
        let fields = [...fieldRows].map(field => {
            delete field.id;
            return field;
        });

        const data = {
            name: moduleName,
            label: moduleLabel,
            fields: fields,
        };

        post('module/create', data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="contained" size="small" onClick={onSave}>
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
