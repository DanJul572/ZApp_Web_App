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

import CChartType from '@/constant/CChartType';
import CComponentGroupType from '@/constant/CComponentGroupType';
import CContainerType from '@/constant/CContainerType';
import CVisualElement from '@/constant/CVisualElementType';

const Label = props => {
    const {content, selected, editComponent, setContent} = props;

    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState();

    const onApply = () => {
        let newContent = editComponent('label', label, content);

        setContent([...newContent]);
        setOpen(false);
    };

    const validComponent = () => {
        if (!selected) return false;

        let group = selected.group.value;
        let type = selected.type.value;

        if (group === CComponentGroupType.container.value && type === CContainerType.collapse.value) return true;
        else if (group === CComponentGroupType.container.value && type === CContainerType.tab.value) return true;
        else if (group === CComponentGroupType.chart.value && type !== CChartType.pie.value) return true;
        else if (group === CComponentGroupType.visualElement.value && type === CVisualElement.text.value) return true;
        else if (group === CComponentGroupType.fieldControl.value) return true;
        else if (group === CComponentGroupType.button.value) return true;
        else return false;
    };

    useEffect(() => {
        if (selected) setLabel(selected.properties.label || null);
    }, [selected]);

    return (
        validComponent() && (
            <Box>
                <Box paddingX={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontSize={12}>Label</Typography>
                    <IconButton sx={{padding: 0}} size="small" onClick={() => setOpen(true)}>
                        <InsertLink fontSize="small" />
                    </IconButton>
                </Box>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Label</DialogTitle>
                    <DialogContent>
                        <Box width={500}>
                            <Code value={label} onChange={setLabel} lang="js" />
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

export default Label;
