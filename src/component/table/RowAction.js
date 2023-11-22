import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Delete from '@mui/icons-material/Delete';
import Description from '@mui/icons-material/Description';
import Edit from '@mui/icons-material/Edit';
import Info from '@mui/icons-material/Info';

import CActionType from '@/constant/CActionType';

const RowAction = props => {
    const {onClickRowAction, action, row, isSupportRowAction, rowCustomAction, setOpenRowCustomActionDialog, setRowClicked} =
        props;

    const onClickCustomAction = () => {
        setOpenRowCustomActionDialog(true);
        setRowClicked(row.original);
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            {isSupportRowAction() && action.find(item => item.type === CActionType.update.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: CActionType.update,
                            row: row.original,
                        })
                    }
                    size="small">
                    <Edit fontSize="small" />
                </IconButton>
            )}
            {isSupportRowAction() && action.find(item => item.type === CActionType.delete.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: CActionType.delete,
                            row: row.original,
                        })
                    }
                    size="small">
                    <Delete fontSize="small" />
                </IconButton>
            )}
            {isSupportRowAction() && action.find(item => item.type === CActionType.detail.value) && (
                <IconButton
                    onClick={() =>
                        onClickRowAction({
                            action: CActionType.detail,
                            row: row.original,
                        })
                    }
                    size="small">
                    <Info fontSize="small" />
                </IconButton>
            )}
            {rowCustomAction.length > 0 && (
                <IconButton onClick={onClickCustomAction} size="small">
                    <Description fontSize="small" />
                </IconButton>
            )}
        </Box>
    );
};

export default RowAction;
