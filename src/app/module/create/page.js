'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FieldForm from './FieldForm';
import ModuleForm from './ModuleForm';

import {useAlert} from '@/context/AlertProvider';
import {useLoading} from '@/context/LoadingProvider';

import CApiUrl from '@/constant/CApiUrl';

import Request from '@/hooks/Request';

const Page = () => {
    const {post} = Request();

    const {back, push} = useRouter();
    const {setLoading} = useLoading();
    const {setAlert} = useAlert();

    const [moduleName, setModuleName] = useState(null);
    const [moduleLabel, setModuleLabel] = useState(null);
    const [moduleDescription, setModuleDescription] = useState(null);
    const [fieldRows, setFieldRows] = useState([]);

    const onCancel = () => {
        back();
    };

    const onSave = () => {
        setLoading(true);

        let fields = [...fieldRows].map(field => {
            delete field.id;
            return field;
        });

        const data = {
            name: moduleName,
            label: moduleLabel,
            description: moduleDescription,
            fields: fields,
        };

        post(CApiUrl.module.create, data)
            .then(res => {
                setAlert({
                    status: true,
                    type: 'success',
                    message: res,
                });
                push('/module');
            })
            .catch(err => {
                setAlert({
                    status: true,
                    type: 'error',
                    message: err,
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box>
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
        </Box>
    );
};

export default Page;
