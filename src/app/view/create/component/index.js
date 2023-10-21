import {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Grid, Typography, colors} from '@mui/material';
import {inputType, containerType, dataDisplayType, visualElementType} from '@/constant';

const Component = () => {
    const [open, setOpen] = useState({});

    const container = Object.keys(containerType).map(key => containerType[key]);
    const input = Object.keys(inputType).map(key => inputType[key]);
    const dataDisplay = Object.keys(dataDisplayType).map(key => dataDisplayType[key]);
    const visualElement = Object.keys(visualElementType).map(key => visualElementType[key]);

    const groups = [
        {name: 'container', label: 'Container', components: container},
        {name: 'fieldControl', label: 'Field Control', components: input},
        {name: 'dataDisplay', label: 'Data Display', components: dataDisplay},
        {name: 'visualElement', label: 'Visual Element', components: visualElement},
    ];

    const handleCollapse = group => {
        setOpen(prevState => ({
            ...prevState,
            [group]: !prevState[group],
        }));
    };

    const collapseGroup = () => {
        if (!groups.length) return;

        let groupCollapse = {};
        groups.forEach(group => {
            groupCollapse[group.name] = true;
        });
        setOpen(groupCollapse);
    };

    useEffect(() => {
        collapseGroup();
    }, []);

    return (
        <Grid item xs={2} border={1} borderRight={0} borderColor={colors.grey[400]}>
            {groups.map((group, index) => (
                <List key={index} disablePadding>
                    <ListItemButton
                        onClick={() => handleCollapse(group.name)}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Typography fontSize={11} fontWeight="bold">
                            {group.label}
                        </Typography>
                        {open[group.name] ? (
                            <ExpandLess fontSize="11" />
                        ) : (
                            <ExpandMore fontSize="11" />
                        )}
                    </ListItemButton>
                    <Collapse in={open[group.name]}>
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
        </Grid>
    );
};

export default Component;
