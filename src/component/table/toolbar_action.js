import {actionType} from '@/constant';
import {Box, Button} from '@mui/material';

const ToolbarAction = props => {
    const {onClickToolbarAction} = props;
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                p: '0.5rem',
                flexWrap: 'wrap',
            }}>
            <Button
                color="primary"
                onClick={() => onClickToolbarAction(actionType.insert)}
                variant="contained"
                size="small">
                Create New Data
            </Button>
        </Box>
    );
};

export default ToolbarAction;
