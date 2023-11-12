import {useRouter} from 'next/navigation';

import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

import Tree from '@/component/tree/Tree';

import MENU_LIST from '@/constant/MENU_LIST';

const Sidebar = () => {
    const {push} = useRouter();

    const onClick = menu => {
        push(menu.url);
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
            <Tree onChildClick={onClick} list={MENU_LIST} />
        </Box>
    );
};

export default Sidebar;
