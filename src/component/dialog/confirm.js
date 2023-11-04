import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Confirm = props => {
    const {open, title, text, confirmButton, cancelButton, onConfirm} = props;

    return (
        <Dialog open={open} onClose={() => onConfirm(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onConfirm(false)} variant="outlined" size="small">
                    {cancelButton}
                </Button>
                <Button onClick={() => onConfirm(true)} variant="contained" size="small">
                    {confirmButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Confirm;
