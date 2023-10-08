import {Dialog, DialogContent, List, ListItem, ListItemButton, ListItemText} from '@mui/material';

const CustomActionDialog = () => {
    return (
        <Dialog open={true}>
            <DialogContent style={{width: '20rem', padding: 0}}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {}}>
                            <ListItemText primary="Trash" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Spam" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default CustomActionDialog;
