import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const RowCustomActionDialog = props => {
    const {
        onClickRowCustomAction,
        openRowCustomActionDialog,
        rowClicked,
        rowCustomAction,
        setOpenRowCustomActionDialog,
    } = props;

    const onCLickAction = action => {
        onClickRowCustomAction({
            action: action,
            row: rowClicked,
        });
        setOpenRowCustomActionDialog(false);
    };

    return (
        <Dialog open={openRowCustomActionDialog}>
            <DialogContent sx={{width: '20rem', padding: 0}}>
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
