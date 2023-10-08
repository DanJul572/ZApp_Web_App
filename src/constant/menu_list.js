import ListIcon from '@mui/icons-material/List';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import PreviewIcon from '@mui/icons-material/Preview';

const menuList = [
    [
        {
            name: 'Module',
            icon: <ViewColumnIcon />,
            url: '/module',
        },
        {
            name: 'View',
            icon: <PreviewIcon />,
            url: '/view',
        },
        {
            name: 'Menu',
            icon: <ListIcon />,
            url: 'menu',
        },
    ],
];

export default menuList;
