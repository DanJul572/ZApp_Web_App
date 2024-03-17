import Box from '@mui/material/Box';

import MuiDrawer from '@/alias/MuiDrawer';

const Drawer = props => {
    const {open, children, setOpen, size} = props;

    const onOpen = () => {
        if (setOpen) {
            setOpen(false);
        }
    };

    return (
        <MuiDrawer open={open} anchor="right" onClose={onOpen}>
            <Box padding={2} width={parseInt(size) || 750}>
                {children}
            </Box>
        </MuiDrawer>
    );
};

export default Drawer;
