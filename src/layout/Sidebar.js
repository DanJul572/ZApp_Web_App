import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

import Tree from '@/component/tree';

import request from '@/helper/request';

import CModuleID from '@/constant/CModuleID';

const Sidebar = () => {
    const {push} = useRouter();

    const [list, setList] = useState([]);

    const onClick = menu => push(menu.url);

    const onLoad = () => {
        const body = {
            moduleId: CModuleID.menus,
            rowId: 1,
        };

        request.post('/general/detail', body).then(res => {
            setList(res.tree);
            localStorage.setItem('tree', JSON.stringify(res.tree));
        });
    };

    useEffect(() => {
        const tree = JSON.parse(localStorage.getItem('tree'));
        if (!tree) onLoad();
        else setList(tree);
    }, []);

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
            <Tree onChildClick={onClick} list={list} />
        </Box>
    );
};

export default Sidebar;
