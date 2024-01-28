import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

import {getCookie, setCookie} from 'cookies-next';

import Request from '@/helper/request';

import Tree from '@/component/tree';

const Sidebar = () => {
    const {get} = Request();

    const {push} = useRouter();

    const [list, setList] = useState([]);

    const onClick = menu => push(menu.url);

    const onLoad = () => {
        get('/general/menu').then(res => {
            setList(res.tree);
            setCookie(res.tree);
        });
    };

    useEffect(() => {
        const tree = getCookie('tree');
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
