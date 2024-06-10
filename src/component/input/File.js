import {useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

import {MuiFileInput} from 'mui-file-input';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Close from '@mui/icons-material/Close';
import Download from '@mui/icons-material/Download';

import {useFile} from '@/context/FileProvider';

import {downloadFile} from '@/helper/downloadFile';
import {getFileFromBuffer} from '@/helper/readFile';

import Request from '@/hook/Request';
import Translator from '@/hook/Translator';

import CApiUrl from '@/constant/CApiUrl';
import CTheme from '@/constant/CTheme';

const File = props => {
    const {label, onChange, name, disabled, existingValue} = props;

    const {get} = Request();
    const {t} = Translator();
    const {files, setFile} = useFile();

    const value = files && files.length > 0 ? files.find(file => file.name === name) : null;

    const handleChange = file => {
        if (file) {
            const id = `${uuidv4()}_${file.name}`;
            const newFile = {
                id: id,
                name: name,
                file: file,
            };
            setFile(prevFiles => {
                const existingFileIndex = prevFiles.findIndex(file => file.name === newFile.name);
                if (existingFileIndex !== -1) {
                    const updatedFiles = [...prevFiles];
                    updatedFiles[existingFileIndex] = newFile;
                    return updatedFiles;
                } else {
                    return [...prevFiles, newFile];
                }
            });
            if (onChange) {
                onChange(id);
            }
        } else {
            setFile(prevFiles => {
                const existingFileIndex = prevFiles.findIndex(file => file.name === name);
                if (existingFileIndex !== -1) {
                    const updatedFiles = [...prevFiles];
                    updatedFiles.splice(existingFileIndex, 1);
                    return updatedFiles;
                }
                return prevFiles;
            });
            if (onChange) {
                onChange(null);
            }
        }
    };

    const handleDownload = () => {
        downloadFile(value.file);
    };

    const getFile = () => {
        get(CApiUrl.files.download, {name: existingValue})
            .then(res => {
                if (res) {
                    handleChange(getFileFromBuffer(res));
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (existingValue) {
            getFile();
        }
    }, [existingValue]);

    return (
        <Box display="flex" alignItems="center">
            <Box width="100%">
                <Typography fontSize={CTheme.font.size.value}>{label}</Typography>
                <MuiFileInput
                    disabled={disabled}
                    fullWidth
                    multiple={false}
                    onChange={handleChange}
                    size={CTheme.field.size.name}
                    value={value && value.file ? value.file : null}
                    clearIconButtonProps={{
                        title: t('delete'),
                        children: <Close fontSize="small" />,
                    }}
                />
            </Box>
            <IconButton size={CTheme.button.size.name} onClick={handleDownload}>
                <Download />
            </IconButton>
        </Box>
    );
};

export default File;
