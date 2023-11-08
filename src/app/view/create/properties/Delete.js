import {useState} from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import {Delete as  DeleteIcon} from '@mui/icons-material';

import Confirm from '@/component/dialog/Confirm';

const Delete = props => {
    const {selected, content, setContent, setSelected, deleteSelected} = props;

    const [open, setOpen] = useState(false);

    const onDelete = confirm => {
        if (confirm) {
            const newContent = deleteSelected(content);
            setContent([...newContent]);
            setSelected(null);
        }
        setOpen(false);
    };

    return selected ? (
        <>
            <Box paddingX={2} marginY={2} display="flex" justifyContent="space-between">
                <Typography fontSize={12} fontWeight="bold">
                    {selected.type.label}
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <DeleteIcon fontSize="12" />
                </IconButton>
            </Box>
            <Confirm
                open={open}
                title="Delete Component"
                text="Are you sure you want to delete this component ?"
                confirmButton="Delete"
                cancelButton="Cancel"
                onConfirm={onDelete}
            />
        </>
    ) : (
        <></>
    );
};

export default Delete;
