import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';

import DeleteComponent from './DeleteComponent';
import Identity from './Identity';
import Position from './Position';
import Size from './Size';

import COMPONENT_GROUP_TYPE from '@/constant/COMPONENT_GROUP_TYPE';

const Properties = props => {
    const {selected, setSelected, setContent, content} = props;

    const deleteSelected = content => {
        for (let i = 0; i < content.length; i++) {
            const component = content[i];
            if (component.id === selected.id) {
                content.splice(i, 1);
            }
            if (component.group.value === COMPONENT_GROUP_TYPE.container.value) {
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
            if (component.group.value === COMPONENT_GROUP_TYPE.container.value) {
                for (let y = 0; y < component.section.length; y++) {
                    const section = component.section[y];
                    changeProperties(key, value, section);
                }
            }
        }
        return content;
    };

    return (
        <Grid item xs={2} border={1} borderLeft={0} borderColor={grey[400]}>
            <DeleteComponent
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
            <Size content={content} selected={selected} changeProperties={changeProperties} setContent={setContent} />
        </Grid>
    );
};

export default Properties;
