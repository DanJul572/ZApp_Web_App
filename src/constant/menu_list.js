import ListIcon from '@mui/icons-material/List';
import PreviewIcon from '@mui/icons-material/Preview';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

const MENU_LIST = [
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

export default MENU_LIST;
