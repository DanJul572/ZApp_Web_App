import {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Grid, Typography, colors} from '@mui/material';
import {
    inputType,
    containerType,
    dataDisplayType,
    visualElementType,
    componentGroupType,
} from '@/constant';

const Component = props => {
    const {content, setContent} = props;

    const [componentList, setComponentList] = useState([]);
    const [open, setOpen] = useState({});

    const container = Object.keys(containerType).map(key => containerType[key]);
    const input = Object.keys(inputType).map(key => inputType[key]);
    const dataDisplay = Object.keys(dataDisplayType).map(key => dataDisplayType[key]);
    const visualElement = Object.keys(visualElementType).map(key => visualElementType[key]);

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

        if (group.value === componentGroupType.container.value) component.section = [];

        setContent([...content, component]);
    };

    const groupTypeValue = group => {
        if (!group) return;

        return {value: group.value, label: group.label};
    };

    const componentListInitiation = () => {
        let groupType = {...componentGroupType};

        groupType.container.components = container;
        groupType.fieldControl.components = input;
        groupType.dataDisplay.components = dataDisplay;
        groupType.visualElement.components = visualElement;

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
        <Grid item xs={2} border={1} borderRight={0} borderColor={colors.grey[400]}>
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
                            {open[group.value] ? (
                                <ExpandLess fontSize="11" />
                            ) : (
                                <ExpandMore fontSize="11" />
                            )}
                        </ListItemButton>
                        <Collapse in={open[group.value]}>
                            <List disablePadding>
                                {group.components.map((component, index) => (
                                    <ListItemButton
                                        key={index}
                                        onClick={() =>
                                            handleSelected(groupTypeValue(group), component)
                                        }>
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
