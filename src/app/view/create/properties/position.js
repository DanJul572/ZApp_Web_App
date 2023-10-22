import {Number, ShortText} from '@/component/input';
import {componentGroupType} from '@/constant';
import {Settings} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';

const Position = props => {
    const {selected, content, setContent, setSelected} = props;

    const [destinationID, setDestinationID] = useState(null);
    const [sectionIndex, setSectionIndex] = useState(null);
    const [rowIndex, setRowIndex] = useState(null);
    const [open, setOpen] = useState(false);

    const changePosition = content => {
        console.log('kesini 1');
        if (!destinationID) {
            content.splice(parseInt(rowIndex), 0, selected);
        } else {
            for (let i = 0; i < content.length; i++) {
                const component = content[i];
                if (component.id === destinationID) {
                    if (component.section.length === 0) {
                        component.section.push([selected]);
                    } else {
                        component.section[parseInt(sectionIndex)].splice(
                            parseInt(rowIndex),
                            0,
                            selected,
                        );
                    }
                }

                if (component.group.value === componentGroupType.container.value) {
                    for (let x = 0; x < component.section.length; x++) {
                        const section = component.section[x];
                        changePosition(section);
                    }
                }
            }
        }
        return content;
    };

    const deleteSelected = content => {
        console.log('kesini 2');
        for (let i = 0; i < content.length; i++) {
            const component = content[i];
            if (component.id === selected.id) {
                content.splice(i, 1);
            }
            if (component.group.value === componentGroupType.container.value) {
                for (let x = 0; x < component.section.length; x++) {
                    const section = component.section[x];
                    deleteSelected(section);
                }
            }
        }
        return content;
    };

    const onMove = () => {
        const newContent = JSON.parse(JSON.stringify(content));
        const deleted = deleteSelected(newContent);
        const changed = changePosition(deleted);

        setContent(changed);
        setSelected(null);
        setOpen(false);
    };

    useEffect(() => {
        setDestinationID(null);
        setSectionIndex(null);
        setRowIndex(null);
    }, [selected]);

    return selected ? (
        <>
            <Box padding={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontSize={12} fontWeight="bold">
                    Position
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                    <Settings fontSize="12" />
                </IconButton>
            </Box>
            <Divider />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Change Component Position</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <ShortText
                            label="Desination ID"
                            value={destinationID}
                            onChange={setDestinationID}
                        />
                        <Box display="flex" gap={1}>
                            <Number
                                label="Section"
                                value={sectionIndex}
                                onChange={setSectionIndex}
                            />
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
