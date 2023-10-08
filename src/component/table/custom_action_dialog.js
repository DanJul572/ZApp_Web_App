import {Dialog, DialogContent, List, ListItem, ListItemButton, ListItemText} from '@mui/material';

const RowCustomActionDialog = props => {
    const {
        openRowCustomActionDialog,
        rowCustomAction,
        rowClicked,
        onClickRowAction,
        setOpenRowCustomActionDialog,
    } = props;

    const onCLickAction = action => {
        onClickRowAction({
            action: action,
            row: rowClicked,
        });
        setOpenRowCustomActionDialog(false);
    };

    return (
        <Dialog open={openRowCustomActionDialog}>
            <DialogContent style={{width: '20rem', padding: 0}}>
                <List>
                    {rowCustomAction.map((action, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => onCLickAction(action)}>
                                <ListItemText primary={action.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default RowCustomActionDialog;
