import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';

import LongText from '@/component/input/LongText';

import CComponentGroupType from '@/constant/CComponentGroupType';
import CContainerType from '@/constant/CContainerType';
import CVisualElement from '@/constant/CVisualElementType';

const Label = props => {
    const {content, selected, changeProperties, setContent} = props;

    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState();

    const onApply = () => {
        let newContent = changeProperties('label', label, content);

        setContent([...newContent]);
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;
        let type = selected.type.value;

        if (group === CComponentGroupType.container.value && type !== CContainerType.collaps.value) return false;
        if (group === CComponentGroupType.dataDisplay.value) return false;
        if (group === CComponentGroupType.visualElement.value && type === CVisualElement.divider.value) return false;

        return true;
    };

    useEffect(() => {
        if (selected) setLabel(selected.properties.label || null);
    }, [selected]);

    return validComponent() ? (
        <>
            <Box paddingX={2} marginBottom={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontSize={12} fontWeight="bold">
                    Label
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <Settings fontSize="small" />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Box width={500}>
                        <LongText label="Label" value={label} onChange={setLabel} rows={4} />
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

export default Label;
