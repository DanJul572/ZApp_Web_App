import {forwardRef} from 'react';
import {useRouter} from 'next/navigation';
import {useSpring, animated} from '@react-spring/web';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import {alpha, styled} from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

import {TreeView} from '@mui/x-tree-view/TreeView';
import {TreeItem, treeItemClasses} from '@mui/x-tree-view/TreeItem';

import Folder from '@mui/icons-material/Folder';
import FolderOpen from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';

import MENU_LIST from '@/constant/MENU_LIST';

const TransitionComponent = props => {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
};

const CustomTreeItem = forwardRef((props, ref) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));
CustomTreeItem.displayName = 'CustomTreeItem';

const StyledTreeItem = styled(CustomTreeItem)(({theme}) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
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
                defaultExpanded={['1']}
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
