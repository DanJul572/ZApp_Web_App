import {Delete} from '@mui/icons-material';
import {Box, Typography, IconButton, Divider} from '@mui/material';

const DeleteComponent = props => {
    const {selected, content, setContent, setSelected} = props;

    const onDelete = arr => {
        for (let i = 0; i < arr.length; i++) {
            const component = arr[i];
            if (component.id === selected.id) {
                arr.splice(i, 1);
                setContent(arr);
                setSelected(null);
                break;
            } else if (component.section) {
                onDelete(component.section);
            }
        }
    };

    return selected ? (
        <>
            <Box padding={2} display="flex" justifyContent="space-between">
                <Typography fontSize={12} fontWeight="bold">
                    {selected.type.label}
                </Typography>
                <IconButton style={{padding: 0}} size="small" onClick={() => onDelete(content)}>
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
