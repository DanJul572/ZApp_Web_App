import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';

import Number from '@/component/input/Number';
import ShortText from '@/component/input/ShortText';

import COMPONENT_GROUP_TYPE from '@/constant/COMPONENT_GROUP_TYPE';

const Position = props => {
    const {selected, content, setContent, setSelected, deleteSelected} = props;

    const [containerID, setContainerID] = useState(null);
    const [columnIndex, setColumnIndex] = useState(null);
    const [rowIndex, setRowIndex] = useState(null);
    const [open, setOpen] = useState(false);

    const changePosition = content => {
        let rowIndexInt = parseInt(rowIndex);
        let columnIndexInt = parseInt(columnIndex);

        if (!containerID) {
            content.splice(rowIndexInt, 0, selected);
        } else {
            for (let x = 0; x < content.length; x++) {
                const component = content[x];
                if (component.id === containerID) {
                    if (!component.section[columnIndex]) {
                        component.section.push([selected]);
                    } else {
                        component.section[columnIndexInt].splice(rowIndexInt, 0, selected);
                    }
                }
                if (component.group.value === COMPONENT_GROUP_TYPE.container.value) {
                    for (let y = 0; y < component.section.length; y++) {
                        const section = component.section[y];
                        changePosition(section);
                    }
                }
            }
        }
        return content;
    };

    const onMove = () => {
        let newContent = deleteSelected(content);
        newContent = changePosition(newContent);

        setContent([...newContent]);
        setSelected(null);
        setOpen(false);
    };

    useEffect(() => {
        setContainerID(null);
        setColumnIndex(null);
        setRowIndex(null);
    }, [selected]);

    return selected ? (
        <>
            <Box paddingX={2} marginBottom={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontSize={12} fontWeight="bold">
                    Position
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <Settings fontSize="small" />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <ShortText label="Container ID" value={containerID} onChange={setContainerID} />
                        <Box display="flex" gap={1}>
                            <Number label="Section" value={columnIndex} onChange={setColumnIndex} />
                            <Number label="Row" value={rowIndex} onChange={setRowIndex} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="outlined" size="small">
                        Cancel
                    </Button>
                    <Button onClick={onMove} variant="contained" size="small">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    ) : (
        <></>
    );
};

export default Position;
