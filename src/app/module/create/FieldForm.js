import {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import grey from '@mui/material/colors/grey';

import ACTION_TYPE from '@/constant/ACTION_TYPE';
import DATA_TYPE from '@/constant/DATA_TYPE';
import INPUT_TYPE from '@/constant/INPUT_TYPE';

import Confirm from '@/component/dialog/Confirm';
import Dropdown from '@/component/input/Dropdown';
import ShortText from '@/component/input/ShortText';
import Table from '@/component/table';
import Toggle from '@/component/input/Toggle';

import mockColumns from '@/mock/field/column';

const FieldForm = props => {
    const {fieldRows, setFieldRows} = props;

    const inputTypeOptions = Object.values(INPUT_TYPE);
    const dataTypeOptions = Object.values(DATA_TYPE).filter(
        type => type.value === DATA_TYPE.varchar.value || type.value === DATA_TYPE.integer.value,
    );

    const [openFieldForm, setOpenFieldForm] = useState(false);
    const [fieldName, setFieldName] = useState(null);
    const [fieldLabel, setFieldLabel] = useState(null);
    const [inputType, setInputType] = useState(null);
    const [fieldSettings, setFieldSettings] = useState({
        dataType: null,
        tableRef: null,
        tableRefKey: null,
        tableRefName: null,
        tableRefFilter: null,
        notNull: false,
        multiSelect: false,
        identity: false,
        autoIncrement: false,
    });
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [rowSelected, setRowSelected] = useState(false);

    const openFieldFormACTION_TYPE = 6;
    const toolbarCustomAction = [
        {
            type: openFieldFormACTION_TYPE,
            label: 'Add New Field',
        },
    ];
    const action = [
        {
            type: ACTION_TYPE.delete.value,
            path: '/',
        },
    ];

    const changeSettingValue = (key, value) => {
        setFieldSettings(prevState => ({...prevState, [key]: value}));
    };

    const clearFieldSettings = () => {
        setFieldSettings({
            dataType: null,
            tableRef: null,
            tableRefKey: null,
            tableRefName: null,
            tableRefFilter: null,
            notNull: false,
            multiSelect: false,
            identity: false,
            autoIncrement: false,
        });
    };

    const dataTypeValue = inputType => {
        if (
            !inputType ||
            inputType.value === INPUT_TYPE.checkbox.value ||
            inputType.value === INPUT_TYPE.dropdown.value ||
            inputType.value === INPUT_TYPE.radio.value
        )
            return null;

        if (inputType.value === INPUT_TYPE.code.value || inputType.value === INPUT_TYPE.richText.value)
            return DATA_TYPE.text.value;

        if (inputType.value === INPUT_TYPE.date.value || inputType.value === INPUT_TYPE.time.value)
            return DATA_TYPE.datetime.value;

        if (inputType.value === INPUT_TYPE.file.value) return DATA_TYPE.byte.value;

        if (inputType.value === INPUT_TYPE.longText.value || inputType.value === INPUT_TYPE.shortText.value)
            return DATA_TYPE.varchar.value;

        if (inputType.value === INPUT_TYPE.number.value) return DATA_TYPE.integer.value;

        if (inputType.value === INPUT_TYPE.toggle.value) return DATA_TYPE.boolean.value;
    };

    const deleteField = () => {
        const newFieldrows = fieldRows.filter(field => field.id !== rowSelected.id);
        setFieldRows(newFieldrows);
    };

    const deleteConfirmation = confirm => {
        if (confirm) deleteField();
        setOpenConfirmDialog(false);
    };

    const onClickToolbarAction = action => {
        if (action.type === openFieldFormACTION_TYPE) {
            setFieldName(null);
            setFieldLabel(null);
            setInputType(null);
            clearFieldSettings();
            setOpenFieldForm(true);
        }
    };

    const onClickRowAction = data => {
        if (data.action.value === ACTION_TYPE.delete.value) {
            setOpenConfirmDialog(true);
            setRowSelected(data.row);
        }
    };

    const onChangeInputType = inputType => {
        clearFieldSettings();
        setInputType(inputType);
        changeSettingValue('dataType', dataTypeValue(inputType));
    };

    const onSave = () => {
        const newId = fieldRows.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
        const newRows = {
            id: newId,
            name: fieldName,
            label: fieldLabel,
            inputType: inputType,
            dataType: fieldSettings.dataType,
            tableRef: fieldSettings.tableRef,
            tableRefKey: fieldSettings.tableRefKey,
            tableRefName: fieldSettings.tableRefName,
            tableRefFilter: fieldSettings.tableRefFilter,
            notNull: fieldSettings.notNull,
            multiSelect: fieldSettings.multiSelect,
            identity: fieldSettings.identity,
            autoIncrement: fieldSettings.autoIncrement,
        };
        setFieldRows([...fieldRows, newRows]);
        setOpenFieldForm(false);
    };

    const refTableSettings = () => {
        if (
            inputType.value !== INPUT_TYPE.dropdown.value &&
            inputType.value !== INPUT_TYPE.checkbox.value &&
            inputType.value !== INPUT_TYPE.radio.value
        )
            return false;

        return (
            <Box display="flex" flexDirection="column" gap={2}>
                <Dropdown
                    label="Data Type"
                    options={dataTypeOptions}
                    value={fieldSettings.dataType}
                    onChange={value => changeSettingValue('dataType', value)}
                />
                <ShortText
                    label="Table Reference"
                    value={fieldSettings.tableRef}
                    onChange={value => changeSettingValue('tableRef', value)}
                />
                <ShortText
                    label="Table Reference Key"
                    value={fieldSettings.tableRefKey}
                    onChange={value => changeSettingValue('tableRefKey', value)}
                />
                <ShortText
                    label="Table Reference Name"
                    value={fieldSettings.tableRefName}
                    onChange={value => changeSettingValue('tableRefName', value)}
                />
                <ShortText
                    label="Table Reference Filter"
                    value={fieldSettings.tableRefFilter}
                    onChange={value => changeSettingValue('tableRefFilter', value)}
                />
            </Box>
        );
    };

    const identitySetting = () => {
        if (
            inputType.value !== INPUT_TYPE.longText.value &&
            inputType.value !== INPUT_TYPE.number.value &&
            inputType.value !== INPUT_TYPE.shortText.value
        )
            return false;

        return (
            <Box>
                <Toggle
                    label="is Identity"
                    value={fieldSettings.identity}
                    onChange={value => changeSettingValue('identity', value)}
                />
            </Box>
        );
    };

    const autoIncrementSetting = () => {
        if (inputType.value !== INPUT_TYPE.number.value) return false;

        return (
            <Box>
                <Toggle
                    label="Auto Increment"
                    value={fieldSettings.autoIncrement}
                    onChange={value => changeSettingValue('autoIncrement', value)}
                />
            </Box>
        );
    };

    const notNullSetting = () => {
        return (
            <Box>
                <Toggle
                    label="Not Null"
                    value={fieldSettings.notNull}
                    onChange={value => changeSettingValue('notNull', value)}
                />
            </Box>
        );
    };

    const fieldSettingsComponent = () => {
        if (!inputType) return false;

        return (
            <Box
                marginY={2}
                border={1}
                padding={2}
                borderRadius={1}
                borderColor={grey[300]}
                display="flex"
                flexDirection="column"
                gap={2}>
                {refTableSettings()}
                <Box display="flex" alignItems="center" gap={2}>
                    {identitySetting()}
                    {autoIncrementSetting()}
                    {notNullSetting()}
                </Box>
            </Box>
        );
    };

    return (
        <>
            <Table
                action={action}
                columnKey={'id'}
                columns={mockColumns}
                onClickRowAction={onClickRowAction}
                onClickToolbarAction={onClickToolbarAction}
                toolbarCustomAction={toolbarCustomAction}
                rows={fieldRows}
            />
            <Drawer anchor="right" open={openFieldForm} onClose={() => setOpenFieldForm(false)}>
                <Box padding={2}>
                    <Box display="flex" justifyContent="flex-end" gap={2} marginBottom={2}>
                        <Button variant="contained" size="small" onClick={onSave}>
                            Add
                        </Button>
                        <Button variant="outlined" size="small" onClick={() => setOpenFieldForm(false)}>
                            Cancel
                        </Button>
                    </Box>
                    <Box width={500} display="flex" flexDirection="column" gap={2}>
                        <ShortText label="Name" value={fieldName} onChange={setFieldName} />
                        <ShortText label="Label" value={fieldLabel} onChange={setFieldLabel} />
                        <Dropdown
                            label="Input Type"
                            options={inputTypeOptions}
                            value={inputType}
                            onChange={onChangeInputType}
                        />
                    </Box>
                    {fieldSettingsComponent()}
                </Box>
            </Drawer>
            <Confirm
                open={openConfirmDialog}
                title="Delete Field"
                text="Are you sure you want to delete this field ?"
                confirmButton="Delete"
                cancelButton="Cancel"
                onConfirm={deleteConfirmation}
            />
        </>
    );
};

export default FieldForm;
