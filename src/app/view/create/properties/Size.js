import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';

import ShortText from '@/component/input/ShortText';

import CONTAINER_TYPE from '@/constant/CONTAINER_TYPE';
import COMPONENT_GROUP_TYPE from '@/constant/COMPONENT_GROUP_TYPE';

const Size = props => {
    const {content, selected, changeProperties, setContent} = props;

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const onApply = () => {
        let newContent = changeProperties('size', size, content);

        setContent([...newContent]);
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        if (
            selected.type.value === CONTAINER_TYPE.grid.value &&
            selected.group.value === COMPONENT_GROUP_TYPE.container.value
        )
            return true;

        return false;
    };

    useEffect(() => {
        if (selected) setSize(selected.properties.size || null);
    }, [selected]);

    return validComponent() ? (
        <>
            <Box padding={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontSize={12} fontWeight="bold">
                    Size
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <Settings fontSize="12" />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Box>
                        <ShortText label="Size" value={size} onChange={setSize} />
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

export default Size;
