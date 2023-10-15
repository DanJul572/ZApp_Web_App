import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const Confirm = props => {
    const {open, title, text, confirmButton, cancelButton, onConfirm} = props;

    return (
        <Dialog open={open} onClose={() => onConfirm(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onConfirm(true)} variant="contained" size="small">
                    {confirmButton}
                </Button>
                <Button onClick={() => onConfirm(false)} size="small">
                    {cancelButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Confirm;
