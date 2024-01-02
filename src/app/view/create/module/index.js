import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import LongText from '@/component/input/LongText';
import ShortText from '@/component/input/ShortText';
import Table from '@/component/table';

const Module = () => {
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            type: 4,
        },
        {
            accessorKey: 'name',
            header: 'Name',
            type: 1,
        },
        {
            accessorKey: 'label',
            header: 'Label',
            type: 1,
        },
        {
            accessorKey: 'inputType',
            header: 'Input Type',
            type: 3,
        },
        {
            accessorKey: 'identity',
            header: 'Is Identity',
            type: 6,
        },
    ];

    return (
        <Box padding={1}>
            <Grid container justifyContent="space-between" spacing={2} marginBottom={2}>
                <Grid item display="flex" flexDirection="column" gap={2} xs={6}>
                    <ShortText label="Name" disabled={true} />
                    <ShortText label="Label" disabled={true} />
                </Grid>
                <Grid item xs={6}>
                    <LongText label="Description" disabled={true} rows={4} />
                </Grid>
            </Grid>
            <Table columnKey={'id'} columns={columns} />
        </Box>
    );
};

export default Module;
