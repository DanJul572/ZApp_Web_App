const {Box, Button} = require('@mui/material');

const ToolbarAction = props => {
    const {onAdd} = props;
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                p: '0.5rem',
                flexWrap: 'wrap',
            }}>
            <Button color="primary" onClick={onAdd} variant="contained" size="small">
                Create New Data
            </Button>
        </Box>
    );
};

export default ToolbarAction;
