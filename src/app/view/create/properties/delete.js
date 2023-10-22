import {componentGroupType} from '@/constant';
import {Delete as DeleteIcon} from '@mui/icons-material';
import {Box, Typography, IconButton, Divider} from '@mui/material';

const Delete = props => {
    const {selected, content, setContent} = props;

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
            }
        }
        return content;
    };

    const onDelete = () => {
        let newContent = JSON.parse(JSON.stringify(content));
        setContent(deleteSelected(newContent));
    };

    return selected ? (
        <>
            <Box padding={2} display="flex" justifyContent="space-between">
                <Typography fontSize={12} fontWeight="bold">
                    {selected.id}
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={onDelete}>
                    <DeleteIcon fontSize="12" />
                </IconButton>
            </Box>
            <Divider />
        </>
    ) : (
        <></>
    );
};

export default Delete;
