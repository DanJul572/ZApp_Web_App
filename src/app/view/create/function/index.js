import {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Code from '@/component/input/Code';
import Drawer from '@/component/container/Drawer';
import ShortText from '@/component/input/ShortText';
import Table from '@/component/table';

import Confirm from '@/component/dialog/Confirm';

import CActionType from '@/constant/CActionType';

const Function = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [code, setCode] = useState(null);
    const [rows, setRows] = useState([]);
    const [rowSelected, setRowSelected] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const action = [
        {
            type: CActionType.insert.value,
        },
        {
            type: CActionType.delete.value,
        },
    ];

    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            type: 4,
        },
        {
            accessorKey: 'name',
            header: 'Function Name',
            type: 1,
        },
        {
            accessorKey: 'code',
            header: 'Function Code',
            type: 13,
        },
    ];

    const onClickToolbarAction = action => {
        if (action.value === CActionType.insert.value) {
            setOpen(true);
            setRowSelected(null);
        }
    };

    const onClickRowAction = data => {
        if (data.action.type === CActionType.delete.value) {
            setRowSelected(data.row);
            setOpenConfirmDialog(true);
        }
    };

    const onSave = () => {
        const row = {
            name: name,
            code: code,
        };
        const newRows = [...rows, row].map((row, index) => {
            row.id = index + 1;
            return row;
        });
        setRows(newRows);
        setOpen(false);
    };

    const deleteConfirmation = confirm => {
        if (confirm) {
            const newRows = [...rows].filter(row => row.id !== rowSelected.id);
            setRows(newRows);
            setRowSelected(null);
        }
        setOpenConfirmDialog(false);
    };

    return (
        <Box padding={1}>
            <Table
                action={action}
                columnKey={'id'}
                columns={columns}
                onClickRowAction={onClickRowAction}
                onClickToolbarAction={onClickToolbarAction}
                rows={rows}
            />
            <Drawer open={open} setOpen={setOpen}>
                <Box display="flex" alignItems="end" justifyContent="flex-end" gap={1}>
                    <Button size="small" onClick={() => setOpen(false)} variant="outlined">
                        Cancel
                    </Button>
                    <Button size="small" onClick={onSave} variant="contained">
                        Save
                    </Button>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    <ShortText label="Name" value={name} onChange={setName} />
                    <Code value={code} onChange={setCode} lang="js" />
                </Box>
            </Drawer>
            <Confirm
                cancelButton="Cancel"
                confirmButton="Delete"
                onConfirm={deleteConfirmation}
                open={openConfirmDialog}
                text="Are you sure you want to delete this function ?"
                title="Delete Function"
            />
        </Box>
    );
};

export default Function;
