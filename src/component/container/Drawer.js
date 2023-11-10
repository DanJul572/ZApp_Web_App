import Box from '@mui/material/Box';

import MuiDrawer from './alias/MuiDrawer.';

const Drawer = props => {
    const {open, children, setOpen} = props;

    return (
        <MuiDrawer open={open} anchor="right" onClose={() => setOpen(false)}>
            <Box padding={2} width={750}>
                {children}
            </Box>
        </MuiDrawer>
    );
};

export default Drawer;
