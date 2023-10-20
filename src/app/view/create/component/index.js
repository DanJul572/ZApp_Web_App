import {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Box, Typography} from '@mui/material';
import containerType from '@/constant/container_type';
import visualElementType from '@/constant/visual_element_type';
import dataDisplayType from '@/constant/data_display_type';

const Component = () => {
    const [open, setOpen] = useState({});

    const handleClick = group => {
        setOpen(prevState => ({
            ...prevState,
            [group]: !prevState[group],
        }));
    };

    const container = Object.keys(containerType).map(key => containerType[key]);
    const input = Object.keys(inputType).map(key => inputType[key]);
    const dataDisplay = Object.keys(dataDisplayType).map(key => dataDisplayType[key]);
    const visualElement = Object.keys(visualElementType).map(key => visualElementType[key]);

    const groups = [
        {id: 'container', label: 'Container', components: container},
        {id: 'fieldControl', label: 'Field Control', components: input},
        {id: 'dataDisplay', label: 'Data Display', components: dataDisplay},
        {id: 'visualElement', label: 'Visual Element', components: visualElement},
    ];

    const collapseGroup = () => {
        let groupCollapse = {};
        groups.forEach(group => {
            groupCollapse[group.id] = true;
        });
        setOpen(groupCollapse);
    };

    useEffect(() => {
        if (!groups.length) return;

        collapseGroup();
    }, []);

    return (
        <Box>
            {groups.map((group, index) => (
                <List key={index}>
                    <ListItemButton
                        onClick={() => handleClick(group.id)}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Typography fontSize={11} fontWeight="bold">
                            {group.label}
                        </Typography>
                        {open[group.id] ? (
                            <ExpandLess fontSize="11" />
                        ) : (
                            <ExpandMore fontSize="11" />
                        )}
                    </ListItemButton>
                    <Collapse in={open[group.id]}>
                        <List disablePadding>
                            {group.components.map((component, index) => (
                                <ListItemButton key={index}>
                                    <Typography fontSize={11} style={{marginLeft: 10}}>
                                        {component.label}
                                    </Typography>
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>
            ))}
        </Box>
    );
};

export default Component;
