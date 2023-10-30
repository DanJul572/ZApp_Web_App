import {useState} from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Delete from '@mui/icons-material/Delete';

import Confirm from '@/component/dialog/Confirm';

const DeleteComponent = props => {
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
            <Box padding={2} display="flex" justifyContent="space-between">
                <Typography fontSize={12} fontWeight="bold">
                    {selected.type.label}
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <Delete fontSize="12" />
                </IconButton>
            </Box>
            <Divider />
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

export default DeleteComponent;
