import {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

import COMPONENT_GROUP_TYPE from '@/constant/COMPONENT_GROUP_TYPE';
import CONTAINER_TYPE from '@/constant/CONTAINER_TYPE';
import DATA_DISPLAY_TYPE from '@/constant/DATA_DISPLAY_TYPE';
import INPUT_TYPE from '@/constant/INPUT_TYPE';
import VISUAL_ELEMENT_TYPE from '@/constant/VISUAL_ELEMENT_TYPE';
import BUTTON_TYPE from '@/constant/BUTTON_TYPE';

const Component = props => {
    const {content, setContent, setSelected} = props;

    const [componentList, setComponentList] = useState([]);
    const [open, setOpen] = useState({});

    const container = Object.keys(CONTAINER_TYPE)
        .sort()
        .map(key => CONTAINER_TYPE[key]);

    const input = Object.keys(INPUT_TYPE)
        .filter(key => key !== 'code')
        .sort()
        .map(key => INPUT_TYPE[key]);

    const dataDisplay = Object.keys(DATA_DISPLAY_TYPE)
        .sort()
        .map(key => DATA_DISPLAY_TYPE[key]);

    const visualElement = Object.keys(VISUAL_ELEMENT_TYPE)
        .sort()
        .map(key => VISUAL_ELEMENT_TYPE[key]);

    const button = Object.keys(BUTTON_TYPE)
        .sort()
        .map(key => BUTTON_TYPE[key]);

    const handleCollapse = group => {
        setOpen(prevState => ({
            ...prevState,
            [group]: !prevState[group],
        }));
    };

    const handleSelected = (group, type) => {
        if (!group && !type) return;

        let component = {group, type};

        component.id = uuidv4();
        component.properties = {};

        if (group.value === COMPONENT_GROUP_TYPE.container.value) component.section = [];

        setSelected(component);
        setContent([...content, component]);
    };

    const groupTypeValue = group => {
        if (!group) return;

        return {value: group.value, label: group.label};
    };

    const componentListInitiation = () => {
        let groupType = {...COMPONENT_GROUP_TYPE};

        groupType.container.components = container;
        groupType.fieldControl.components = input;
        groupType.dataDisplay.components = dataDisplay;
        groupType.visualElement.components = visualElement;
        groupType.button.components = button;

        setComponentList(Object.values(groupType));
    };

    useEffect(() => {
        if (!componentList.length) return;

        let collapse = {};
        componentList.forEach(group => {
            collapse[group.value] = true;
        });

        setOpen(collapse);
    }, [componentList]);

    useEffect(() => {
        componentListInitiation();
    }, []);

    return (
        <Grid
            border={1}
            borderColor={grey[400]}
            bottom={0}
            item
            left={0}
            marginTop={8}
            overflow="auto"
            position="fixed"
            top={0}
            width={500}
            xs={2}>
            {componentList.length > 0 &&
                componentList.map((group, index) => (
                    <List key={index} disablePadding>
                        <ListItemButton
                            onClick={() => handleCollapse(group.value)}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Typography fontSize={11} fontWeight="bold">
                                {group.label}
                            </Typography>
                            {open[group.value] ? <ExpandLess fontSize="11" /> : <ExpandMore fontSize="11" />}
                        </ListItemButton>
                        <Collapse in={open[group.value]}>
                            <List disablePadding>
                                {group.components.map((component, index) => (
                                    <ListItemButton
                                        key={index}
                                        onClick={() => handleSelected(groupTypeValue(group), component)}>
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
