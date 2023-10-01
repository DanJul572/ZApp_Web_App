import {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent} from '@mui/material';
import {QueryBuilder, formatQuery} from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import query_format_type from '@/constant/query_format_type';

const AdvanceFilter = props => {
    const {
        columns = [],
        format = query_format_type.sql.value,
        onAdvanceFilter,
        openAdvanceFilterDialog = false,
        setOpenAdvanceFilterDialog,
    } = props;

    const [fields, setFields] = useState([]);
    const [query, setQuery] = useState(null);

    useEffect(() => {
        let newField = columns.map(column => ({name: column.accessorKey, label: column.header}));
        setFields(newField);
    }, [columns]);

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
