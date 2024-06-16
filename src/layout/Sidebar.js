import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {getCookie, setCookie} from 'cookies-next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import grey from '@mui/material/colors/grey';

import Request from '@/hook/Request';

import ShortText from '@/component/input/ShortText';
import Tree from '@/component/tree';

import CApiUrl from '@/constant/CApiUrl';
import CTheme from '@/constant/CTheme';

const Sidebar = () => {
    const {push} = useRouter();
    const {get} = Request();

    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const tree = getCookie('tree') ? JSON.parse(getCookie('tree')) : [];

    const onClick = menu => {
        push(menu.url);
    };

    const onLoad = () => {
        get(CApiUrl.common.menu).then(res => {
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
        };
        return filterRecursive(arr, label);
    };

    const search = value => {
        if (tree.length > 0) {
            const newList = filterObjectsByLabel(tree, value);
            setList(newList);
        }
    };

    useEffect(() => {
        if (tree.length > 0) {
            setList(tree);
        } else {
            onLoad();
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
                borderColor: grey[300],
                borderRight: CTheme.border.size.value,
                bottom: 0,
                left: 0,
                overflowY: 'auto',
                paddingTop: 10,
                position: 'fixed',
                top: 0,
                width: 300,
            }}>
            <Box paddingX={1} marginBottom={1}>
                <ShortText value={searchTerm} onChange={setSearchTerm} placeholder="Search..." />
            </Box>
            {list.length > 0 && <Tree onChildClick={onClick} list={list} />}
            {list.length <= 0 && (
                <Box paddingX={1} textAlign="center">
                    <Typography>Menu is not found.</Typography>
                </Box>
            )}
        </Box>
    );
};

export default Sidebar;
