import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InsertLink from '@mui/icons-material/InsertLink';
import Typography from '@mui/material/Typography';

import Code from '@/component/input/Code';

import CComponentGroupType from '@/constant/CComponentGroupType';

const ModuleID = props => {
    const {content, selected, editComponent, setContent} = props;

    const [open, setOpen] = useState(false);
    const [moduleID, setModuleID] = useState();

    const onApply = () => {
        let newContent = editComponent('moduleID', moduleID, content);

        setContent([...newContent]);
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;

        if (group !== CComponentGroupType.table.value) return false;

        return true;
    };

    useEffect(() => {
        if (selected) setModuleID(selected.properties.moduleID || null);
    }, [selected]);

    return validComponent() ? (
        <>
            <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontSize={12}>ModuleID</Typography>
                <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <InsertLink fontSize="small" />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>ModuleID</DialogTitle>
                <DialogContent>
                    <Box width={500}>
                        <Code value={moduleID} onChange={setModuleID} lang="js" />
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

export default ModuleID;
