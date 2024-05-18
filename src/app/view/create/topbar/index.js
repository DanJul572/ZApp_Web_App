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
import useTheme from '@mui/material/styles/useTheme';

import Number from '@/component/input/Number';

import {readJSONFile} from '@/helper/readFile';

import Request from '@/hook/Request';
import Translator from '@/hook/Translator';

import {downloadJsonFile} from '@/helper/downloadFile';
import generateContent from '@/helper/generateContent';

import CActionType from '@/constant/CActionType';
import CApiUrl from '@/constant/CApiUrl';
import CModuleID from '@/constant/CModuleID';
import CTheme from '@/constant/CTheme';
import Upload from '@/component/button/Upload';

const TopBar = props => {
    const {content, setContent, label, setLabel, page, setPage, id, setOpenPreview} = props;

    const {get, post} = Request();
    const {t} = Translator();

    const {push} = useRouter();
    const {setLoading} = useLoading();
    const {setToast} = useToast();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [moduleId, setModuleId] = useState(null);

    const onDownload = () => {
        downloadJsonFile(content, label);
    };

    const onUpload = event => {
        readJSONFile(event)
            .then(json => {
                setContent(json);
                event.target.value = null;
            })
            .catch(error => console.log(error));
    };

    const onSave = () => {
        setLoading(true);

        const url = id ? CApiUrl.common.update : CApiUrl.common.create;
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

        const param = {
            moduleId: CModuleID.views,
            rowId: id,
        };

        get(CApiUrl.common.detail, param)
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

    const onApply = () => {
        setOpen(false);
    };

    const onPreview = () => {
        setOpenPreview(true);
    };

    const onGenerate = () => {
        setLoading(true);

        const param = {
            moduleId: moduleId,
        };

        get(CApiUrl.module.detail, param)
            .then(res => {
                const content = generateContent(res, CActionType.insert);
                setContent(content);
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
                    position: 'fixed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 2,
                    borderBottom: CTheme.border.size.value,
                    borderColor: grey[300],
                    zIndex: 2,
                    top: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: theme.palette.background.default,
                }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton size={CTheme.button.size.name} sx={{padding: 0}} onClick={() => push('/view')}>
                        <ArrowBack fontSize={CTheme.font.size.name} sx={{color: theme.palette.text.primary}} />
                    </IconButton>
                    <Typography sx={{fontWeight: 'bold'}}>{t('view_builder')}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                    <Box
                        display="flex"
                        gap={1}
                        borderRight={CTheme.border.size.value}
                        borderColor={grey[300]}
                        paddingRight={1}>
                        <Upload label={t('upload')} onUpload={onUpload} type=".json" />
                        <Button variant="outlined" size={CTheme.button.size.name} onClick={onDownload}>
                            {t('download')}
                        </Button>
                        <Button variant="outlined" size={CTheme.button.size.name} onClick={onGenerate}>
                            {t('generate')}
                        </Button>
                    </Box>
                    <Box display="flex" gap={1}>
                        <Button variant="outlined" size={CTheme.button.size.name} onClick={onPreview}>
                            {t('preview')}
                        </Button>
                        <Button variant="contained" size={CTheme.button.size.name} onClick={onSave}>
                            {t('save')}
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Dialog open={open}>
                <DialogTitle>{t('conntect_to_module')}</DialogTitle>
                <DialogContent>
                    <Box width={500}>
                        <Number value={moduleId} onChange={setModuleId} label="Module ID" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onApply} variant="contained" size={CTheme.button.size.name}>
                        {t('apply')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TopBar;
