import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ACTION_TYPE from '@/constant/ACTION_TYPE';

const ToolbarAction = props => {
    const {onClickToolbarAction, toolbarCustomAction, isSupportAddAction} = props;

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                p: '0.5rem',
                flexWrap: 'wrap',
            }}>
            {isSupportAddAction && (
                <Button
                    onClick={() => onClickToolbarAction(ACTION_TYPE.insert)}
                    variant="contained"
                    size="small">
                    Create New Data
                </Button>
            )}
            {toolbarCustomAction.map((action, index) => (
                <Button
                    key={index}
                    onClick={() => onClickToolbarAction(action)}
                    variant="contained"
                    size="small">
                    {action.label}
                </Button>
            ))}
        </Box>
    );
};

export default ToolbarAction;
