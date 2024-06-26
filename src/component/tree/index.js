import {forwardRef} from 'react';

import {alpha, styled} from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';

import {SimpleTreeView} from '@mui/x-tree-view/SimpleTreeView';
import {TreeItem, treeItemClasses} from '@mui/x-tree-view/TreeItem';

import Folder from '@mui/icons-material/Folder';
import FolderOpen from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';

import {useExpandedMenu} from '@/context/ExpandedMenuProvider';

const CustomTreeItem = forwardRef((props, ref) => <TreeItem {...props} ref={ref} />);
CustomTreeItem.displayName = 'CustomTreeItem';

const StyledTreeItem = styled(CustomTreeItem)(({theme}) => ({
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 10,
        paddingLeft: 10,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    [`& .${treeItemClasses.label}`]: {
        fontSize: 15,
        color: theme.palette.text.primary,
    },
}));

const Tree = props => {
    const {onChildClick, onParentClick, list, isSidebar} = props;

    const theme = useTheme();
    const {expandedMenu, setExpandedMenu} = useExpandedMenu();

    const clickParent = menu => {
        if (isSidebar) {
            if (!expandedMenu.includes(menu.id)) {
                setExpandedMenu([...expandedMenu, menu.id]);
            } else {
                const expanded = [...expandedMenu].filter(item => item !== menu.id);
                setExpandedMenu(expanded);
            }
        }

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
                <StyledTreeItem key={menu.id} itemId={menu.id} label={menu.label} onClick={() => clickParent(menu)}>
                    {menu.child.map(child => menuList(child))}
                </StyledTreeItem>
            );
        } else {
            return (
                <StyledTreeItem key={menu.id} itemId={menu.id} label={menu.label} onClick={() => onChildClick(menu)} />
            );
        }
    };

    const ExpandIcon = props => {
        return <Folder {...props} sx={{color: theme.palette.primary.main}} />;
    };

    const CollapseIcon = props => {
        return <FolderOpen {...props} sx={{color: theme.palette.primary.main}} />;
    };

    const EndIcon = props => {
        return <InsertDriveFileOutlined {...props} sx={{color: theme.palette.primary.main}} />;
    };

    return (
        <SimpleTreeView
            aria-label="customized"
            slots={{
                expandIcon: ExpandIcon,
                collapseIcon: CollapseIcon,
                endIcon: EndIcon,
            }}
            sx={{overflowX: 'hidden', padding: 1}}
            defaultExpandedItems={isSidebar ? expandedMenu : []}>
            {list && list.length > 0 && list.map(menu => menuList(menu))}
        </SimpleTreeView>
    );
};

export default Tree;
