import {action_type} from '@/constant';
import {Delete, Edit, Info, MoreVert} from '@mui/icons-material';
import {Box, IconButton} from '@mui/material';

const RowAction = props => {
    const {onClickRowAction, action, row, isSupportAction, columnKey} = props;

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            {isSupportAction() && action.find(item => item.type === action_type.insert.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            type: action_type.insert.value,
                            key: row.original[columnKey],
                        })
                    }
                    size="small">
                    <Edit fontSize="11" />
                </IconButton>
            )}
            {isSupportAction() && action.find(item => item.type === action_type.delete.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            type: action_type.delete.value,
                            key: row.original[columnKey],
                        })
                    }
                    size="small">
                    <Delete fontSize="11" />
                </IconButton>
            )}
            {isSupportAction() && action.find(item => item.type === action_type.detail.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            type: action_type.detail.value,
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
