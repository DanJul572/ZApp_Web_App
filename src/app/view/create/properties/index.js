import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';

import Delete from './Delete';
import Identity from './Identity';
import Label from './Label';
import Position from './Position';
import Size from './Size';

import CComponentGroupType from '@/constant/CComponentGroupType';

const Properties = props => {
    const {selected, setSelected, setContent, content, activeNavigation, navigationType} = props;

    const deleteSelected = content => {
        for (let i = 0; i < content.length; i++) {
            const component = content[i];
            if (component.id === selected.id) {
                content.splice(i, 1);
            }
            if (component.group.value === CComponentGroupType.container.value) {
                for (let x = 0; x < component.section.length; x++) {
                    const section = component.section[x];
                    deleteSelected(section);
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

    const changeProperties = (key, value, content) => {
        let newSelected = selected;
        newSelected.properties[key] = value;

        for (let x = 0; x < content.length; x++) {
            const component = content[x];
            if (component.id === newSelected.id) {
                content.splice(x, 1, newSelected);
            }
            if (component.group.value === CComponentGroupType.container.value) {
                for (let y = 0; y < component.section.length; y++) {
                    const section = component.section[y];
                    changeProperties(key, value, section);
                }
            }
        }
        return content;
    };

    return (
        <Grid
            border={1}
            borderColor={grey[300]}
            bottom={0}
            item
            marginTop={7}
            overflow="auto"
            position="fixed"
            right={0}
            top={0}
            width={500}
            xs={2}>
            {activeNavigation === navigationType.content && (
                <Box>
                    <Delete
                        content={content}
                        deleteSelected={deleteSelected}
                        selected={selected}
                        setContent={setContent}
                        setSelected={setSelected}
                    />
                    <Identity selected={selected} />
                    <Position
                        changeProperties={changeProperties}
                        content={content}
                        deleteSelected={deleteSelected}
                        selected={selected}
                        setContent={setContent}
                        setSelected={setSelected}
                    />
                    <Label
                        content={content}
                        selected={selected}
                        changeProperties={changeProperties}
                        setContent={setContent}
                    />
                    <Size
                        content={content}
                        selected={selected}
                        changeProperties={changeProperties}
                        setContent={setContent}
                    />
                </Box>
            )}
        </Grid>
    );
};

export default Properties;
