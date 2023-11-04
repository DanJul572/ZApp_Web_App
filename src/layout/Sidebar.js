import {forwardRef} from 'react';
import {useRouter} from 'next/navigation';

import Box from '@mui/material/Box';
import {alpha, styled} from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

import {TreeView} from '@mui/x-tree-view/TreeView';
import {TreeItem, treeItemClasses} from '@mui/x-tree-view/TreeItem';

import Folder from '@mui/icons-material/Folder';
import FolderOpen from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';

import MENU_LIST from '@/constant/MENU_LIST';

const CustomTreeItem = forwardRef((props, ref) => <TreeItem {...props} ref={ref} />);
CustomTreeItem.displayName = 'CustomTreeItem';

const StyledTreeItem = styled(CustomTreeItem)(({theme}) => ({
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    [`& .${treeItemClasses.label}`]: {
        fontSize: 12,
    },
}));

const Sidebar = () => {
    const {push} = useRouter();

    const menuList = menu => {
        if (menu.child) {
            return (
                <StyledTreeItem key={menu.id} nodeId={menu.id} label={menu.label}>
                    {menu.child.map(child => menuList(child))}
                </StyledTreeItem>
            );
        } else {
            return <StyledTreeItem key={menu.id} nodeId={menu.id} label={menu.label} onClick={() => push(menu.url)} />;
        }
    };

    return (
        <Box
            sx={{
                width: 300,
                overflowY: 'auto',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                paddingTop: 10,
                borderRight: 1,
                borderColor: grey[300],
            }}>
            <TreeView
                aria-label="customized"
                defaultCollapseIcon={<FolderOpen />}
                defaultExpandIcon={<Folder />}
                defaultEndIcon={<InsertDriveFileOutlined />}
                sx={{overflowX: 'hidden'}}>
                {MENU_LIST.map(menu => menuList(menu))}
            </TreeView>
        </Box>
    );
};

export default Sidebar;
