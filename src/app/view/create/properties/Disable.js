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

const Disable = props => {
    const {content, selected, changeProperties, setContent} = props;

    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState({
        isBind: false,
        value: null,
    });

    const onApply = () => {
        const newContent = changeProperties('disable', disable, content);
        setContent([...newContent]);
        setOpen(false);
    };

    const onChange = (isBind, value) => {
        if (isBind) {
            setDisable({
                isBind: true,
                value: value,
            });
        } else {
            const temValue = {
                isBind: false,
                value: value,
            };
            const newContent = changeProperties('disable', temValue, content);
            setContent(structuredClone(newContent));
        }
    };

    const onRemove = () => {
        setDisable({
            isBind: false,
            value: false,
        });
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;
        if (group !== CComponentGroupType.button.value) return false;
        return true;
    };

    useEffect(() => {
        if (selected) {
            const value = selected.properties.disable;
            if (value) setDisable(value);
        }
    }, [content]);

    return validComponent() ? (
        <>
            <Tooltip arrow title={disable.isBind ? 'Is Bindding' : null} placement="left">
                <Box paddingX={2} marginY={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Toggle
                        value={disable.isBind || !disable.value ? false : disable.value}
                        label="Disable"
                        onChange={value => onChange(false, value)}
                        disabled={disable.isBind}
                    />
                    <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                        <InsertLink fontSize="small" />
                    </IconButton>
                </Box>
            </Tooltip>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Disable</DialogTitle>
                <DialogContent>
                    <Box width={500} paddingY={1}>
                        <Code
                            value={!disable.isBind ? null : disable.value}
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

export default Disable;
