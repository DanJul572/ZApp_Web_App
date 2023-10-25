import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Delete from '@mui/icons-material/Delete';
import Description from '@mui/icons-material/Description';
import Edit from '@mui/icons-material/Edit';
import Info from '@mui/icons-material/Info';

import ACTION_TYPE from '@/constant/ACTION_TYPE';

const RowAction = props => {
    const {onClickRowAction, action, row, isSupportRowAction, rowCustomAction, setOpenRowCustomActionDialog, setRowClicked} =
        props;

    const onClickCustomAction = () => {
        setOpenRowCustomActionDialog(true);
        setRowClicked(row.original);
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            {isSupportRowAction() && action.find(item => item.type === ACTION_TYPE.update.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: ACTION_TYPE.update,
                            row: row.original,
                        })
                    }
                    size="small">
                    <Edit fontSize="11" />
                </IconButton>
            )}
            {isSupportRowAction() && action.find(item => item.type === ACTION_TYPE.delete.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: ACTION_TYPE.delete,
                            row: row.original,
                        })
                    }
                    size="small">
                    <Delete fontSize="11" />
                </IconButton>
            )}
            {isSupportRowAction() && action.find(item => item.type === ACTION_TYPE.detail.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: ACTION_TYPE.detail,
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
