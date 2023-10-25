import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import componentGroupType from '@/constant/component_group_type';

const DeleteComponent = props => {
    const {selected, content, setContent, setSelected} = props;

    const deleteSelected = content => {
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
                for (let y = 0; y < component.section.length; y++) {
                    if (component.section[y].length === 0) {
                        component.section.splice(y, 1);
                    }
                }
            }
        }
        return content;
    };

    const onDelete = () => {
        setContent(deleteSelected(content));
        setSelected(null);
    };

    return selected ? (
        <>
            <Box padding={2} display="flex" justifyContent="space-between">
                <Typography fontSize={12} fontWeight="bold">
                    {selected.type.label}
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={onDelete}>
                    <Delete fontSize="12" />
                </IconButton>
            </Box>
            <Divider />
        </>
    ) : (
        <></>
    );
};

export default DeleteComponent;
