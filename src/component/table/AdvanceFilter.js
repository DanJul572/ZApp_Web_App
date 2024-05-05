import {useEffect, useState} from 'react';

import {QueryBuilder, formatQuery} from 'react-querybuilder';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import CInputType from '@/constant/CInputType';
import CTheme from '@/constant/CTheme';

const AdvanceFilter = props => {
    const {columns, format, onAdvanceFilter, openAdvanceFilterDialog, setOpenAdvanceFilterDialog} = props;

    const [query, setQuery] = useState(null);
    const [fields, setFields] = useState([]);

    const inputType = type => {
        if (type === CInputType.date.value) return 'date';
        if (type === CInputType.time.value) return 'time';
        if (type === CInputType.datetime.value) return 'datetime-local';
        if (type === CInputType.number.value) return 'number';
        return 'text';
    };

    const valueEditorType = type => {
        if (type === CInputType.dropdown.value) return 'select';
        if (type === CInputType.checkbox.value) return 'multiselect';
        if (type === CInputType.radio.value) return 'radio';
        if (type === CInputType.longText.value) return 'textarea';
        if (type === CInputType.toggle.value) return 'checkbox';
        return false;
    };

    const values = type => {
        if (type !== CInputType.checkbox.value && type !== CInputType.dropdown.value && type !== CInputType.radio.value)
            return false;
        return [
            {label: 'Options 1', name: 'Options1'},
            {label: 'Options 2', name: 'Options2'},
            {label: 'Options 3', name: 'Options3'},
        ];
    };

    useEffect(() => {
        const newFields = columns.map(column => {
            return {
                inputType: inputType(column.type),
                label: column.header,
                name: column.accessorKey,
                valueEditorType: valueEditorType(column.type),
                values: values(column.type),
            };
        });
        setFields(newFields);
    }, [columns]);

    return (
        <Dialog open={openAdvanceFilterDialog}>
            <DialogContent>
                <QueryBuilder fields={fields} onQueryChange={query => setQuery(formatQuery(query, format))} />
            </DialogContent>
            <DialogActions>
                <Button
                    size={CTheme.button.size.name}
                    onClick={() => setOpenAdvanceFilterDialog(false)}
                    variant="outlined">
                    Cancel
                </Button>
                <Button onClick={() => onAdvanceFilter(query)} size={CTheme.button.size.name} variant="contained">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdvanceFilter;
