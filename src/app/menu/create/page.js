'use client';

import {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import Delete from '@mui/icons-material/Delete';
import Folder from '@mui/icons-material/Folder';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Save from '@mui/icons-material/Save';

import Tree from '@/component/tree';

import Dropdown from '@/component/input/Dropdown';
import ShortText from '@/component/input/ShortText';
import CMenuList from '@/constant/CMenuList';

const Page = () => {
    const [label, setLabel] = useState();
    const [roleId, setRoleId] = useState();

    return (
        <Box>
            <Box gap={2} display="flex" flexDirection="column" marginBottom={2}>
                <ShortText value={label} label="Label" onChange={setLabel} />
                <Dropdown value={roleId} label="Role" onChange={setRoleId} id={11} />
            </Box>
            <Box border={1} borderColor={grey[300]} borderRadius={1}>
                <Box display="flex" gap={1} alignItems="center" padding={1} justifyContent="space-between">
                    <Box>
                        <Tooltip arrow title="Move To Up">
                            <IconButton size="small">
                                <KeyboardArrowUp fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Move To Down">
                            <IconButton size="small">
                                <KeyboardArrowDown fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Add Folder">
                            <IconButton size="small" color="info" variant="outlined">
                                <Folder fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Add File">
                            <IconButton size="small" color="info" variant="outlined">
                                <InsertDriveFileOutlined fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Delete">
                            <IconButton size="small" color="error" variant="outlined">
                                <Delete fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box display="flex" gap={1} justifyContent="flex-end">
                        <Button size="small" color="success" startIcon={<Save fontSize="small" />} variant="outlined">
                            <Typography>Save</Typography>
                        </Button>
                    </Box>
                </Box>
                <Divider />
                <Box padding={1}>
                    <Tree list={CMenuList} onParentClick={val => console.log(val)} onChildClick={val => console.log(val)} />
                </Box>
            </Box>
        </Box>
    );
};

export default Page;
