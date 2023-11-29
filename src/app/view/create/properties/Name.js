import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ShortTextOutlined from '@mui/icons-material/ShortTextOutlined';

import ShortText from '@/component/input/ShortText';

import CComponentGroupType from '@/constant/CComponentGroupType';

const Name = props => {
    const {content, selected, changeProperties, setContent} = props;

    const [open, setOpen] = useState(false);
    const [name, setName] = useState();

    const onApply = () => {
        let newContent = changeProperties('name', name, content);

        setContent([...newContent]);
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;

        if (group !== CComponentGroupType.fieldControl.value) return false;

        return true;
    };

    useEffect(() => {
        if (selected) setName(selected.properties.name || null);
    }, [selected]);

    return validComponent() ? (
        <>
            <Box paddingX={2} marginBottom={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontSize={12}>Name</Typography>
                <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <ShortTextOutlined fontSize="small" />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Name</DialogTitle>
                <DialogContent>
                    <Box width={500} paddingY={1}>
                        <ShortText value={name} onChange={setName} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="outlined" size="small">
                        Cancel
                    </Button>
                    <Button onClick={onApply} variant="contained" size="small">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    ) : (
        <></>
    );
};

export default Name;
