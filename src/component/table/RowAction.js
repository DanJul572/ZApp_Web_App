import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Delete from '@mui/icons-material/Delete';
import Description from '@mui/icons-material/Description';
import Edit from '@mui/icons-material/Edit';
import Info from '@mui/icons-material/Info';

import actionType from '@/constant/action_type';

const RowAction = props => {
    const {onClickRowAction, action, row, isSupportRowAction, rowCustomAction, setOpenRowCustomActionDialog, setRowClicked} =
        props;

    const onClickCustomAction = () => {
        setOpenRowCustomActionDialog(true);
        setRowClicked(row.original);
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            {isSupportRowAction() && action.find(item => item.type === actionType.update.value) && (
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
            {isSupportRowAction() && action.find(item => item.type === actionType.delete.value) && (
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
            {isSupportRowAction() && action.find(item => item.type === actionType.detail.value) && (
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
