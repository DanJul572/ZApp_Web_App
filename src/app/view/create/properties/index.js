import PropTypes from 'prop-types';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import grey from '@mui/material/colors/grey';

import Color from './Color';
import Delete from './Delete';
import Disable from './Disable';
import Display from './Display';
import Identity from './Identity';
import Label from './Label';
import ModuleID from './ModuleID';
import ModuleSettings from './ModuleSettings';
import Name from './Name';
import OnClick from './OnClick';
import Position from './Position';
import Size from './Size';
import TableAction from './TableAction';

import CComponentGroupType from '@/constant/CComponentGroupType';

const CustomTabPanel = props => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && children}
        </div>
    );
};

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Properties = props => {
    const {selected, setSelected, setContent, content, activeNavigation, navigationType} = props;

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeComponentID = component => {
        const id = uuidv4();
        component.id = id;
        if (component.group.value === CComponentGroupType.container.value) {
            for (let y = 0; y < component.section.length; y++) {
                const section = component.section[y];
                for (let x = 0; x < section.length; x++) {
                    const childComponent = section[x];
                    changeComponentID(childComponent);
                }
            }
        }
        return component;
    };

    const duplicateProcess = (content, duplicateComponent) => {
        for (let x = 0; x < content.length; x++) {
            const component = content[x];
            if (component.id === selected.id) {
                content.splice(x, 0, duplicateComponent);
                return content;
            }
            if (component.group.value === CComponentGroupType.container.value) {
                for (let y = 0; y < component.section.length; y++) {
                    const section = component.section[y];
                    duplicateProcess(section, duplicateComponent);
                }
            }
        }
        return content;
    };

    const duplicateComponent = () => {
        const cloneComponent = structuredClone(selected);
        const newComponent = changeComponentID(cloneComponent);
        const newContent = duplicateProcess(content, newComponent);
        setContent([...newContent]);
    };

    const deleteComponent = content => {
        for (let i = 0; i < content.length; i++) {
            const component = content[i];
            if (component.id === selected.id) {
                content.splice(i, 1);
                return content;
            }
            if (component.group.value === CComponentGroupType.container.value) {
                for (let x = 0; x < component.section.length; x++) {
                    const section = component.section[x];
                    deleteComponent(section);
                }
                for (let y = 0; y < component.section.length; y++) {
                    if (component.section[y].length === 0) {
                        component.section.splice(y, 1);
                    }
                }
            }
        }
        return content;
    };

    const editComponent = (key, value, content) => {
        let newSelected = selected;
        newSelected.properties[key] = value;
        for (let x = 0; x < content.length; x++) {
            const component = content[x];
            if (component.id === newSelected.id) {
                content.splice(x, 1, newSelected);
                return content;
            }
            if (component.group.value === CComponentGroupType.container.value) {
                for (let y = 0; y < component.section.length; y++) {
                    const section = component.section[y];
                    editComponent(key, value, section);
                }
            }
        }
        return content;
    };

    return (
        <Grid
            borderLeft={1}
            borderColor={grey[300]}
            bottom={0}
            item
            marginTop={8}
            overflow="auto"
            position="fixed"
            right={0}
            top={0}
            width={500}
            xs={2}>
            {activeNavigation === navigationType.content && (
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Module" {...a11yProps(0)} />
                            <Tab label="Properties" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <ModuleSettings />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box display="flex" flexDirection="column" gap={2} paddingTop={3}>
                            <Identity selected={selected} />
                            <Delete
                                content={content}
                                deleteComponent={deleteComponent}
                                selected={selected}
                                setContent={setContent}
                                setSelected={setSelected}
                                duplicateComponent={duplicateComponent}
                            />
                            <Position
                                editComponent={editComponent}
                                content={content}
                                deleteComponent={deleteComponent}
                                selected={selected}
                                setContent={setContent}
                                setSelected={setSelected}
                            />
                            <ModuleID
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                            <Name
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                            <Label
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                            <OnClick
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                            <Disable
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                            <Size
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                            <Display
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                            <Color
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                            <TableAction
                                content={content}
                                selected={selected}
                                editComponent={editComponent}
                                setContent={setContent}
                            />
                        </Box>
                    </CustomTabPanel>
                </Box>
            )}
        </Grid>
    );
};

export default Properties;
