import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {useLoading} from '@/context/LoadingProvider';
import {useToast} from '@/context/ToastProvider';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';

import Number from '@/component/input/Number';

import CModuleID from '@/constant/CModuleID';

import Request from '@/hooks/Request';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const TopBar = props => {
    const {content, setContent, label, setLabel, page, setPage, id} = props;

    const {post} = Request();

    const {push} = useRouter();
    const {setLoading} = useLoading();
    const {setToast} = useToast();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [moduleId, setModuleId] = useState(null);

    const onDownload = () => {
        const jsonString = JSON.stringify(content, null, 2);
        const blob = new Blob([jsonString], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'Views.json';

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    };

    const onUpload = event => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const jsonContent = JSON.parse(e.target.result);
                    setContent(jsonContent);
                } catch (error) {
                    console.error('Error parsing JSON file : ', error);
                }
            };
            reader.readAsText(selectedFile);
            event.target.value = null;
        } else {
            console.error('Invalid file type. Please choose a JSON file.');
        }
    };

    const onSave = () => {
        setLoading(true);

        const url = id ? '/general/update' : '/general/create';
        const body = {
            moduleId: CModuleID.views,
            data: {
                moduleId: moduleId,
                content: JSON.stringify(content),
                label: label,
                page: JSON.stringify(page),
            },
        };

        if (id) body.rowId = id;

        post(url, body)
            .then(res => {
                setToast({
                    status: true,
                    type: 'success',
                    message: res,
                });
            })
            .catch(err => {
                setToast({
                    status: true,
                    type: 'error',
                    message: err,
                });
            })
            .finally(() => setLoading(false));
    };

    const onLoad = () => {
        setLoading(true);

        const body = {
            moduleId: CModuleID.views,
            rowId: id,
        };

        post('/general/detail', body)
            .then(res => {
                setModuleId(res.moduleId);
                setContent(res.content);
                setLabel(res.label);
                setPage(res.page);
            })
            .catch(err => {
                setToast({
                    status: true,
                    type: 'error',
                    message: err,
                });
            })
            .finally(() => setLoading(false));
    };

    const onApply = () => setOpen(false);

    useEffect(() => {
        if (!id) {
            setOpen(true);
        } else {
            onLoad();
        }
    }, []);

    return (
        <Box>
            <Box
                sx={{
                    position: 'sticky',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 2,
                    borderBottom: 1,
                    borderColor: grey[300],
                    zIndex: 2,
                    top: 0,
                    right: 0,
                    left: 0,
                }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton size="small" sx={{padding: 0}} onClick={() => push('/view')}>
                        <ArrowBack fontSize="small" sx={{color: theme.palette.text.primary}} />
                    </IconButton>
                    <Typography sx={{fontWeight: 'bold'}}>VIEW BUILDER</Typography>
                </Box>
                <Box display="flex" gap={1}>
                    <Box display="flex" gap={1} borderRight={1} borderColor={grey[300]} paddingRight={1}>
                        <Button component="label" variant="outlined" size="small">
                            Upload
                            <VisuallyHiddenInput type="file" accept=".json" onChange={onUpload} />
                        </Button>
                        <Button variant="outlined" size="small" onClick={onDownload}>
                            Download
                        </Button>
                    </Box>
                    <Box display="flex" gap={1} borderRight={1} borderColor={grey[300]} paddingRight={1}>
                        <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
                            Connect
                        </Button>
                    </Box>
                    <Box display="flex" gap={1}>
                        <Button variant="outlined" size="small">
                            Save As Draft
                        </Button>
                        <Button variant="contained" size="small" onClick={onSave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Dialog open={open}>
                <DialogTitle>Connect To Module</DialogTitle>
                <DialogContent>
                    <Box width={500}>
                        <Number value={moduleId} onChange={setModuleId} label="Module ID" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onApply} variant="contained" size="small">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TopBar;
