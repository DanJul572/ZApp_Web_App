import {actionType} from '@/constant';
import {Delete, Edit, Info, MoreVert} from '@mui/icons-material';
import {Box, IconButton} from '@mui/material';

const RowAction = props => {
    const {onClickRowAction, action, row, isSupportAction, columnKey} = props;

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            {isSupportAction() && action.find(item => item.type === actionType.insert.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: actionType.insert,
                            key: row.original[columnKey],
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
                            key: row.original[columnKey],
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
                            key: row.original[columnKey],
                        })
                    }
                    size="small">
                    <Info fontSize="11" />
                </IconButton>
            )}
            <IconButton onClick={() => {}} size="small">
                <MoreVert fontSize="11" />
            </IconButton>
        </Box>
    );
};

export default RowAction;
