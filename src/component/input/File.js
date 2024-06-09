import {v4 as uuidv4} from 'uuid';

import {MuiFileInput} from 'mui-file-input';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Close from '@mui/icons-material/Close';

import {useFiles} from '@/context/FilesProvider';

import Translator from '@/hook/Translator';

import CTheme from '@/constant/CTheme';

const File = props => {
    const {label, onChange, name, disabled, multiple} = props;

    const {t} = Translator();
    const {files, setFiles} = useFiles();

    const value = files && files.length > 0 ? files.find(file => file.name === name) : null;

    const handleChange = file => {
        if (file) {
            const id = `${uuidv4()}_${file.name}`;
            const newFile = {
                id: id,
                name: name,
                file: file,
            };
            setFiles(prevFiles => {
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
            setFiles(prevFiles => {
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

    return (
        <Box>
            <Typography fontSize={CTheme.font.size.value}>{label}</Typography>
            <MuiFileInput
                disabled={disabled}
                fullWidth
                multiple={multiple}
                onChange={handleChange}
                size={CTheme.field.size.name}
                value={value && value.file ? value.file : null}
                clearIconButtonProps={{
                    title: t('delete'),
                    children: <Close fontSize="small" />,
                }}
            />
        </Box>
    );
};

export default File;
