import {useState} from 'react';

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

const OnLoad = () => {
    const [open, setOpen] = useState(false);
    const [onLoad, setOnLoad] = useState(null);

    const onApply = () => {};

    return (
        <Box>
            <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontSize={12}>On Load</Typography>
                <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <InsertLink fontSize="small" />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>On Load</DialogTitle>
                <DialogContent>
                    <Box width={500}>
                        <Code value={onLoad} onChange={setOnLoad} lang="js" />
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
    );
};

export default OnLoad;
