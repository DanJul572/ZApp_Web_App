import {forwardRef} from 'react';

import {alpha, styled} from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';

import {TreeView} from '@mui/x-tree-view/TreeView';
import {TreeItem, treeItemClasses} from '@mui/x-tree-view/TreeItem';

import Folder from '@mui/icons-material/Folder';
import FolderOpen from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';

const CustomTreeItem = forwardRef((props, ref) => <TreeItem {...props} ref={ref} />);
CustomTreeItem.displayName = 'CustomTreeItem';

const StyledTreeItem = styled(CustomTreeItem)(({theme}) => ({
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    [`& .${treeItemClasses.label}`]: {
        fontSize: 15,
        color: theme.palette.text.primary,
    },
}));

const Tree = props => {
    const {onChildClick, onParentClick, list} = props;

    const theme = useTheme();

    const clickParent = menu => {
        if (onParentClick) {
            onParentClick({
                id: menu.id,
                label: menu.label,
                url: menu.url,
            });
        }
    };

    const menuList = menu => {
        if (menu.child) {
            return (
                <StyledTreeItem key={menu.id} nodeId={menu.id} label={menu.label} onClick={() => clickParent(menu)}>
                    {menu.child.map(child => menuList(child))}
                </StyledTreeItem>
            );
        } else {
            return <StyledTreeItem key={menu.id} nodeId={menu.id} label={menu.label} onClick={() => onChildClick(menu)} />;
        }
    };

    return (
        <TreeView
            aria-label="customized"
            defaultCollapseIcon={<FolderOpen sx={{color: theme.palette.primary.main}} />}
            defaultEndIcon={<InsertDriveFileOutlined sx={{color: theme.palette.primary.main}} />}
            defaultExpandIcon={<Folder sx={{color: theme.palette.primary.main}} />}
            sx={{overflowX: 'hidden'}}>
            {list && list.length > 0 && list.map(menu => menuList(menu))}
        </TreeView>
    );
};

export default Tree;
