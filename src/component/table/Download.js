import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import FileDownload from '@mui/icons-material/FileDownload';

import Request from '@/hook/Request';

import {downloadFileFromBuffer} from '@/helper/downloadFile';

import CTheme from '@/constant/CTheme';
import CApiUrl from '@/constant/CApiUrl';

const extractFileNames = fileName => {
    if (fileName) {
        const underscoreIndex = fileName.indexOf('_');
        if (underscoreIndex !== -1) {
            return fileName.substring(underscoreIndex + 1);
        }
        return fileName;
    }
    return '';
};

const Download = ({label}) => {
    const {get} = Request();

    const onDownload = () => {
        get(CApiUrl.files.download, {name: label})
            .then(res => {
                const bufferFormat = new Uint8Array(res.data.data);
                downloadFileFromBuffer(bufferFormat, extractFileNames(label));
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Box display="flex" alignItems="center">
            {label && (
                <IconButton onClick={onDownload} size={CTheme.button.size.name}>
                    <FileDownload />
                </IconButton>
            )}
            {extractFileNames(label)}
        </Box>
    );
};

export default Download;
