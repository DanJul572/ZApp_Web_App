import {useEffect, useState} from 'react';

import InsertLink from '@mui/icons-material/InsertLink';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Code from '@/component/input/Code';

import CComponentGroupType from '@/constant/CComponentGroupType';
import CInputType from '@/constant/CInputType';

const FieldId = props => {
    const {content, selected, editComponent, setContent} = props;

    const [open, setOpen] = useState(false);
    const [fieldId, setfieldId] = useState();

    const onApply = () => {
        let newContent = editComponent('fieldId', fieldId, content);

        setContent([...newContent]);
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;
        let type = selected.type.value;

        if (group === CComponentGroupType.fieldControl.value && type === CInputType.dropdown.value) return true;

        return false;
    };

    useEffect(() => {
        if (selected) setfieldId(selected.properties.fieldId || null);
    }, [selected]);

    return (
        validComponent() && (
            <Box>
                <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontSize={12}>Field ID</Typography>
                    <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                        <InsertLink fontSize="small" />
                    </IconButton>
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Field ID</DialogTitle>
                    <DialogContent>
                        <Box width={500}>
                            <Code value={fieldId} onChange={setfieldId} lang="js" />
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
            </Box>
        )
    );
};

export default FieldId;
