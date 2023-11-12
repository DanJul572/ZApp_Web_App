'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';

import Tree from '@/component/tree/Tree';

import MENU_LIST from '@/constant/MENU_LIST';

const Menu = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Box border={1} borderColor={grey[300]} borderRadius={1}>
                    <Box display="flex" gap={1} justifyContent="flex-end" padding={1}>
                        <Button size="small" color="success" startIcon={<Add fontSize="small" />} variant="outlined">
                            <Typography>Add</Typography>
                        </Button>
                        <Button size="small" color="error" startIcon={<Delete fontSize="small" />} variant="outlined">
                            <Typography>Delete</Typography>
                        </Button>
                        <Button size="small" color="primary" startIcon={<Save fontSize="small" />} variant="outlined">
                            <Typography>Save</Typography>
                        </Button>
                    </Box>
                    <Divider />
                    <Box padding={1}>
                        <Tree list={MENU_LIST} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Menu;
