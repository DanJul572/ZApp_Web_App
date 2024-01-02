'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import grey from '@mui/material/colors/grey';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Save from '@mui/icons-material/Save';

import Tree from '@/component/tree';

import CMenuList from '@/constant/CMenuList';

const Menu = () => {
    return (
        <Box border={1} borderColor={grey[300]} borderRadius={1}>
            <Box display="flex" gap={1} alignItems="center" padding={1} justifyContent="space-between">
                <Box>
                    <IconButton size="small">
                        <KeyboardArrowUp fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                        <KeyboardArrowDown fontSize="small" />
                    </IconButton>
                </Box>
                <Box display="flex" gap={1} justifyContent="flex-end">
                    <Button size="small" color="success" startIcon={<Add fontSize="small" />} variant="outlined">
                        <Typography>Add</Typography>
                    </Button>
                    <Button size="small" color="error" startIcon={<Delete fontSize="small" />} variant="outlined">
                        <Typography>Delete</Typography>
                    </Button>
                    <Button size="small" startIcon={<Save fontSize="small" />} variant="outlined">
                        <Typography>Save</Typography>
                    </Button>
                </Box>
            </Box>
            <Divider />
            <Box padding={1}>
                <Tree list={CMenuList} />
            </Box>
        </Box>
    );
};

export default Menu;
