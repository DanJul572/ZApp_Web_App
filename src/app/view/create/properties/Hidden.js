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

const Hidden = props => {
    const {content, selected, editComponent, setContent} = props;

    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState({
        isBind: false,
        value: null,
    });

    const onApply = () => {
        callChangeProperties(hidden);
        setOpen(false);
    };

    const onChange = (isBind, value) => {
        if (isBind) {
            setHidden({
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
        setOpen(false);
    };

    const callChangeProperties = val => {
        const newContent = editComponent('hidden', val, content);
        setContent([...newContent]);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;
        if (group !== CComponentGroupType.button.value) return false;
        return true;
    };

    useEffect(() => {
        if (selected) {
            const value = selected.properties.hidden;
            if (value) setHidden(value);
        }
    }, [content, selected]);

    return validComponent() ? (
        <>
            <Tooltip arrow title={hidden.isBind ? 'Is Bindding' : null} placement="left">
                <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Toggle
                        value={Boolean(hidden.value)}
                        label="Hidden"
                        onChange={value => onChange(false, value)}
                        hiddend={hidden.isBind}
                    />
                    <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                        <InsertLink fontSize="small" />
                    </IconButton>
                </Box>
            </Tooltip>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Hidden</DialogTitle>
                <DialogContent>
                    <Box width={500} paddingY={1}>
                        <Code
                            value={!hidden.isBind ? null : hidden.value}
                            onChange={value => onChange(true, value)}
                            lang="js"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="outlined" size="small">
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
        </>
    ) : (
        <></>
    );
};

export default Hidden;
