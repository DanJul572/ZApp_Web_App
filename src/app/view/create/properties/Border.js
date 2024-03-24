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

const Border = props => {
    const {content, selected, editComponent, setContent} = props;

    const [open, setOpen] = useState(false);
    const [border, setBorder] = useState();

    const onApply = () => {
        let newContent = editComponent('border', border, content);

        setContent([...newContent]);
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        const type = selected.type.value;
        const group = selected.group.value;

        if (type === CContainerType.card.value && group === CComponentGroupType.container.value) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (selected) setBorder(selected.properties.border || null);
    }, [selected]);

    return (
        validComponent() && (
            <Box>
                <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontSize={12}>Border</Typography>
                    <IconButton sx={{padding: 0}} padding="small" onClick={() => setOpen(true)}>
                        <ShortTextOutlined fontSize="small" />
                    </IconButton>
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        <Box>
                            <ShortText label="Border" value={border} onChange={setBorder} />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} variant="outlined" padding="small">
                            Cancel
                        </Button>
                        <Button onClick={onApply} variant="contained" padding="small">
                            Apply
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        )
    );
};

export default Border;
