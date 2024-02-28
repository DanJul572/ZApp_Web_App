import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

import {getCookie, setCookie} from 'cookies-next';

import Request from '@/hooks/Request';

import ShortText from '@/component/input/ShortText';
import Tree from '@/component/tree';

const Sidebar = () => {
    const {get} = Request();

    const {push} = useRouter();

    const tree = getCookie('tree') ? JSON.parse(getCookie('tree')) : false;

    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const onClick = menu => push(menu.url);

    const onLoad = () => {
        get('/general/menu').then(res => {
            setList(res.tree);
            setCookie('tree', res.tree);
        });
    };

    const filterObjectsByLabel = (arr, label) => {
        const filterRecursive = (arr, label) => {
            return arr.filter(obj => {
                const menu = obj.label.toLowerCase();
                const keyword = label.toLowerCase();
                if (menu.includes(keyword)) {
                    return true;
                } else if (obj.child) {
                    obj.child = filterRecursive(obj.child, label);
                    return obj.child.length > 0;
                }
                return false;
            });
        }
        return filterRecursive(arr, label);
    };

    const search = value => {
        const newList = filterObjectsByLabel(tree, value);
        setList(newList);
    };

    useEffect(() => {
        if (!tree) {
            onLoad();
        } else {
            setList(tree);
        }
    }, []);

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(
            setTimeout(() => {
                search(searchTerm);
            }, 1000),
        );
    }, [searchTerm]);

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
            <Box paddingX={1} marginBottom={1}>
                <ShortText value={searchTerm} onChange={setSearchTerm} placeholder='Search...' />
            </Box>
            <Tree onChildClick={onClick} list={list} />
        </Box>
    );
};

export default Sidebar;
