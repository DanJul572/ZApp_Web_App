import {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Code from '@/component/input/Code';
import ShortText from '@/component/input/ShortText';
import Drawer from '@/component/container/Drawer';
import Table from '@/component/table';

import ACTION_TYPE from '@/constant/ACTION_TYPE';

import mockColumns from '@/mock/table/columns';
import mockRows from '@/mock/table/rows';

const Function = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [code, setCode] = useState(null);

    const action = [
        {
            type: ACTION_TYPE.insert.value,
            label: ACTION_TYPE.insert.label,
        },
    ];

    const onAdd = action => {
        if (action.value === ACTION_TYPE.insert.value) setOpen(true);
    };

    return (
        <Box marginX={40} sx={{backgroundColor: 'red'}} width="100%">
            <Table action={action} columnKey={'id'} columns={mockColumns} onClickToolbarAction={onAdd} rows={mockRows} />
            <Drawer open={open} setOpen={setOpen}>
                <Box display="flex" alignItems="end" justifyContent="flex-end" gap={1}>
                    <Button size="small" onClick={() => setOpen(false)} variant="outlined">
                        Cancel
                    </Button>
                    <Button size="small" onClick={() => setOpen(false)} variant="contained">
                        Save
                    </Button>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    <ShortText label="Name" value={name} onChange={setName} />
                    <Code value={code} onChange={setCode} />
                </Box>
            </Drawer>
        </Box>
    );
};

export default Function;
