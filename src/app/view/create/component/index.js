import {useEffect, useState} from 'react';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

import CButtonType from '@/constant/CButtonType';
import CChartType from '@/constant/CChartType';
import CComponentGroupType from '@/constant/CComponentGroupType';
import CContainerType from '@/constant/CContainerType';
import CInputType from '@/constant/CInputType';
import CTableType from '@/constant/CTableType';
import CVisualElement from '@/constant/CVisualElementType';

const Component = props => {
    const {content, setContent, setSelected} = props;

    const [componentList, setComponentList] = useState([]);
    const [open, setOpen] = useState({});

    const container = Object.keys(CContainerType)
        .sort()
        .map(key => CContainerType[key]);

    const input = Object.keys(CInputType)
        .filter(key => key !== 'code')
        .sort()
        .map(key => CInputType[key]);

    const visualElement = Object.keys(CVisualElement)
        .sort()
        .map(key => CVisualElement[key]);

    const table = Object.keys(CTableType)
        .sort()
        .map(key => CTableType[key]);

    const chart = Object.keys(CChartType)
        .sort()
        .map(key => CChartType[key]);

    const button = Object.keys(CButtonType)
        .sort()
        .map(key => CButtonType[key]);

    const handleCollapse = group => {
        setOpen(prevState => ({
            ...prevState,
            [group]: !prevState[group],
        }));
    };

    const handleSelected = (group, type) => {
        if (!group && !type) return;

        let component = {group, type};

        component.id = Date.now();
        component.properties = {};

        if (group.value === CComponentGroupType.container.value) component.section = [];

        setSelected(component);
        setContent([...content, component]);
    };

    const groupTypeValue = group => {
        if (!group) return;

        return {value: group.value, label: group.label};
    };

    const componentListInitiation = () => {
        let groupType = {...CComponentGroupType};

        groupType.button.components = button;
        groupType.chart.components = chart;
        groupType.container.components = container;
        groupType.fieldControl.components = input;
        groupType.table.components = table;
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
        <Grid
            border={1}
            borderColor={grey[300]}
            bottom={0}
            item
            left={0}
            marginTop={7}
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
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Typography fontSize={11} fontWeight="bold">
                                {group.label}
                            </Typography>
                            {open[group.value] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                        </ListItemButton>
                        <Collapse in={open[group.value]}>
                            <List disablePadding>
                                {group.components.map((component, index) => (
                                    <ListItemButton
                                        key={index}
                                        onClick={() => handleSelected(groupTypeValue(group), component)}>
                                        <Typography fontSize={11} sx={{marginLeft: 1}}>
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
