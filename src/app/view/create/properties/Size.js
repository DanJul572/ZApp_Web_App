import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ShortTextOutlined from '@mui/icons-material/ShortTextOutlined';

import ShortText from '@/component/input/ShortText';

import CContainerType from '@/constant/CContainerType';
import CComponentGroupType from '@/constant/CComponentGroupType';

const Size = props => {
    const {content, selected, editComponent, setContent} = props;

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const onApply = () => {
        let newContent = editComponent('size', size, content);

        setContent([...newContent]);
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        if (
            selected.type.value === CContainerType.grid.value &&
            selected.group.value === CComponentGroupType.container.value
        )
            return true;

        return false;
    };

    useEffect(() => {
        if (selected) setSize(selected.properties.size || null);
    }, [selected]);

    return validComponent() ? (
        <>
            <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontSize={12}>Size</Typography>
                <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <ShortTextOutlined fontSize="small" />
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
