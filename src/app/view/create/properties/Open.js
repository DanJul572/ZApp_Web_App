import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import InsertLink from '@mui/icons-material/InsertLink';

import Code from '@/component/input/Code';
import Toggle from '@/component/input/Toggle';

import CComponentGroupType from '@/constant/CComponentGroupType';
import CContainerType from '@/constant/CContainerType';

const Open = props => {
    const {content, selected, editComponent, setContent} = props;

    const [openForm, setOpenForm] = useState(false);
    const [open, setOpen] = useState({
        isBind: false,
        value: null,
    });

    const onApply = () => {
        callChangeProperties(open);
        setOpenForm(false);
    };

    const onChange = (isBind, value) => {
        if (isBind) {
            setOpen({
                isBind: true,
                value: value,
            });
        } else {
            const temValue = {
                isBind: false,
                value: value,
            };
            callChangeProperties(temValue);
        }
    };

    const onRemove = () => {
        const temValue = {
            isBind: false,
            value: false,
        };
        callChangeProperties(temValue);
        setOpenForm(false);
    };

    const callChangeProperties = val => {
        const newContent = editComponent('open', val, content);
        setContent([...newContent]);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;
        let type = selected.type.value;

        if (group === CComponentGroupType.container.value && type === CContainerType.drawer.value) return true;

        return false;
    };

    useEffect(() => {
        if (selected) {
            const value = selected.properties.open;
            if (value) setOpen(value);
        }
    }, [content, selected]);

    return (
        validComponent() && (
            <Box>
                <Tooltip arrow title={open.isBind ? 'Is Bindding' : null} placement="left">
                    <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Toggle
                            value={open.isBind ? false : Boolean(open.value)}
                            label="Open"
                            onChange={value => onChange(false, value)}
                            disabled={open.isBind}
                        />
                        <IconButton sx={{padding: 0}} size="small" onClick={() => setOpenForm(true)}>
                            <InsertLink fontSize="small" />
                        </IconButton>
                    </Box>
                </Tooltip>
                <Dialog open={openForm} onClose={() => setOpenForm(false)}>
                    <DialogTitle>Open</DialogTitle>
                    <DialogContent>
                        <Box width={500} paddingY={1}>
                            <Code
                                value={!open.isBind ? null : open.value}
                                onChange={value => onChange(true, value)}
                                lang="js"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenForm(false)} variant="outlined" size="small">
                            Cancel
                        </Button>
                        <Button onClick={onRemove} variant="outlined" size="small">
                            Remove
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

export default Open;
