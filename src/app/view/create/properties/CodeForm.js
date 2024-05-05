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

import isValidProperties from '@/helper/isValidProperties';

import CTheme from '@/constant/CTheme';

const CodeForm = props => {
    const {content, selected, editComponent, setContent, label, name} = props;

    const type = selected ? selected.type.value : false;
    const group = selected ? selected.group.value : false;

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();

    const onApply = () => {
        let newContent = editComponent(name, value, content);

        setContent([...newContent]);
        setOpen(false);
    };

    useEffect(() => {
        if (selected) setValue(selected.properties[name] || null);
    }, [selected]);

    return (
        isValidProperties(name, type, group) && (
            <Box>
                <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontSize={CTheme.font.size.value}>{label}</Typography>
                    <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                        <InsertLink fontSize={CTheme.font.size.name} />
                    </IconButton>
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogContent>
                        <Box width={500}>
                            <Code value={value} onChange={setValue} lang="js" />
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

export default CodeForm;
