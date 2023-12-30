import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import LongText from '@/component/input/LongText';
import ShortText from '@/component/input/ShortText';
import Table from '@/component/table';

import mockColumns from '@/mock/field/column';

const Module = () => {
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
            <Table columnKey={'id'} columns={mockColumns} />
        </Box>
    );
};

export default Module;
