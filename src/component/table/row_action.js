import {actionType} from '@/constant';
import {Delete, Description, Edit, Info} from '@mui/icons-material';
import {Box, IconButton} from '@mui/material';

const RowAction = props => {
    const {
        onClickRowAction,
        action,
        row,
        isSupportAction,
        rowCustomAction,
        setOpenRowCustomActionDialog,
        setRowClicked,
    } = props;

    const onClickCustomAction = () => {
        setOpenRowCustomActionDialog(true);
        setRowClicked(row.original);
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            {isSupportAction() && action.find(item => item.type === actionType.update.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: actionType.update,
                            row: row.original,
                        })
                    }
                    size="small">
                    <Edit fontSize="11" />
                </IconButton>
            )}
            {isSupportAction() && action.find(item => item.type === actionType.delete.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: actionType.delete,
                            row: row.original,
                        })
                    }
                    size="small">
                    <Delete fontSize="11" />
                </IconButton>
            )}
            {isSupportAction() && action.find(item => item.type === actionType.detail.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: actionType.detail,
                            row: row.original,
                        })
                    }
                    size="small">
                    <Info fontSize="11" />
                </IconButton>
            )}
            {rowCustomAction.length > 0 && (
                <IconButton onClick={onClickCustomAction} size="small">
                    <Description fontSize="11" />
                </IconButton>
            )}
        </Box>
    );
};

export default RowAction;
