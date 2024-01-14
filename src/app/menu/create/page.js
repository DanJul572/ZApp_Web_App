'use client';

import {useState} from 'react';

import {v4 as uuidv4} from 'uuid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';

import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Save from '@mui/icons-material/Save';

import Tree from '@/component/tree';

import Dropdown from '@/component/input/Dropdown';
import ShortText from '@/component/input/ShortText';
import CMenuList from '@/constant/CMenuList';

const Page = () => {
    const [label, setLabel] = useState(null);
    const [roleId, setRoleId] = useState(null);
    const [list, setList] = useState(CMenuList);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [activeMenuLabel, setActiveMenuLabel] = useState(null);
    const [activeMenuUrl, setActiveMenuUrl] = useState(null);

    const actionType = {
        add: 1,
        edit: 2,
        delete: 3,
        up: 4,
        down: 5,
    };

    const changeMenuItem = (menu, type, itemParam = null) => {
        if (activeMenuId) {
            for (let x = 0; x < menu.length; x++) {
                const item = menu[x];
                if (item.id === activeMenuId) {
                    const newItem = {
                        id: activeMenuId,
                        label: activeMenuLabel,
                        url: activeMenuUrl,
                    };
                    if (item.child && item.child.length > 0) {
                        newItem.child = item.child;
                    }
                    if (type === actionType.edit) {
                        menu.splice(x, 1, newItem);
                    } else if (type === actionType.add) {
                        if (!item.child) {
                            item.child = [];
                        }
                        item.child.push(itemParam);
                    } else if (type === actionType.up) {
                        if (x > 0) {
                            [menu[x], menu[x - 1]] = [menu[x - 1], menu[x]];
                        }
                    } else if (type === actionType.down) {
                        if (x < menu.length - 1) {
                            [menu[x], menu[x + 1]] = [menu[x + 1], menu[x]];
                        }
                    } else {
                        menu.splice(x, 1);
                    }
                    return menu;
                }
                if (item.child && item.child.length > 0) {
                    changeMenuItem(item.child, type, itemParam);
                }
            }
        }
        return menu;
    };

    const onClick = menu => {
        setActiveMenuId(menu.id);
        setActiveMenuLabel(menu.label);
        setActiveMenuUrl(menu.url);
    };

    const onEdit = () => {
        const result = changeMenuItem([...list], actionType.edit);
        setList(result);
    };

    const onAdd = () => {
        const menu = {
            id: uuidv4(),
            label: 'New Item',
            url: '',
        };
        const result = changeMenuItem([...list], actionType.add, menu);
        setList(result);
    };

    const onDelete = () => {
        const result = changeMenuItem([...list], actionType.delete);
        setList(result);
    };

    const onMove = type => {
        const result = changeMenuItem([...list], type);
        setList(result);
    };

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
                            <IconButton size="small" onClick={() => onMove(actionType.up)}>
                                <KeyboardArrowUp fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Move To Down">
                            <IconButton size="small" onClick={() => onMove(actionType.down)}>
                                <KeyboardArrowDown fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Add Folder">
                            <IconButton size="small" color="success" variant="outlined" onClick={onAdd}>
                                <Add fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Delete">
                            <IconButton size="small" color="error" variant="outlined" onClick={onDelete}>
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
                <Divider sx={{backgroundColor: grey[300]}} />
                <Box padding={1} gap={2} display="flex">
                    <Box flex={1}>
                        <Tree list={list} onParentClick={onClick} onChildClick={onClick} />
                    </Box>
                    <Box display="flex" flexDirection="column" gap={2} flex={1}>
                        <ShortText value={activeMenuLabel} label="Label" onChange={setActiveMenuLabel} onBlur={onEdit} />
                        <ShortText value={activeMenuUrl} label="URL" onChange={setActiveMenuUrl} onBlur={onEdit} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Page;
