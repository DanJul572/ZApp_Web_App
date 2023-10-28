import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const DeleteComponent = props => {
    const {selected, content, setContent, setSelected, deleteSelected} = props;

    const onDelete = () => {
        const newContent = deleteSelected(content);
        setContent([...newContent]);
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
