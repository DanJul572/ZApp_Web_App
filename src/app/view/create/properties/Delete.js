import {useState} from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ContentCopy from '@mui/icons-material/ContentCopy';

import Confirm from '@/component/dialog/Confirm';

import MuiDeleteIcon from '@/alias/MuiDeleteIcon';

const Delete = props => {
    const {selected, content, setContent, setSelected, deleteComponent, duplicateComponent} = props;

    const [open, setOpen] = useState(false);

    const onDelete = confirm => {
        if (confirm) {
            const newContent = deleteComponent(content);
            setContent([...newContent]);
            setSelected(null);
        }
        setOpen(false);
    };

    return (
        selected && (
            <Box>
                <Box paddingX={2} display="flex" justifyContent="space-between">
                    <Typography fontSize={12}>{selected.type.label}</Typography>
                    <Box>
                        <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                            <MuiDeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton sx={{padding: 0}} size="small" onClick={duplicateComponent}>
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Confirm
                    open={open}
                    title="Delete Component"
                    text="Are you sure you want to delete this component ?"
                    confirmButton="Delete"
                    cancelButton="Cancel"
                    onConfirm={onDelete}
                />
            </Box>
        )
    );
};

export default Delete;
