import {useRouter} from 'next/navigation';

import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

import Tree from '@/component/tree';

import CMenuList from '@/constant/CMenuList';

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
            <Tree onChildClick={onClick} list={CMenuList} />
        </Box>
    );
};

export default Sidebar;
