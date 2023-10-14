import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent} from '@mui/material';
import {QueryBuilder, formatQuery} from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';

const AdvanceFilter = props => {
    const {columns, format, onAdvanceFilter, openAdvanceFilterDialog, setOpenAdvanceFilterDialog} =
        props;

    const [query, setQuery] = useState(null);

    const fields = columns.map(column => ({name: column.accessorKey, label: column.header}));

    return (
        <Dialog open={openAdvanceFilterDialog}>
            <DialogContent>
                <QueryBuilder
                    fields={fields}
                    onQueryChange={query => setQuery(formatQuery(query, format))}
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={() => setOpenAdvanceFilterDialog(false)}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={() => onAdvanceFilter(query)}
                    size="small"
                    variant="contained">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdvanceFilter;
