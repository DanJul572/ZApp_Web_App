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
        function filterRecursive(arr, label) {
            return arr.filter(obj => {
                if (obj.label.includes(label)) {
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
        const tree = JSON.parse(getCookie('tree'));
        const newList = filterObjectsByLabel(tree, value);
        setList(newList);
    };

    const handleChange = val => {
        const value = val;
        setSearchTerm(value);
        if (value) {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            setTypingTimeout(
                setTimeout(() => {
                    search(value);
                }, 1000),
            );
        } else {
            const tree = JSON.parse(getCookie('tree'));
            setList(tree);
        }
    };

    useEffect(() => {
        const tree = JSON.parse(getCookie('tree'));
        if (!tree) {
            onLoad();
        } else {
            setList(tree);
        }
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
            <Box paddingX={1} marginBottom={1}>
                <ShortText value={searchTerm} onChange={handleChange} />
            </Box>
            <Tree onChildClick={onClick} list={list} />
        </Box>
    );
};

export default Sidebar;
