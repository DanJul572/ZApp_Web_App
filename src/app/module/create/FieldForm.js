import {useContext, useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import grey from '@mui/material/colors/grey';

import ACTION_TYPE from '@/constant/ACTION_TYPE';
import DATA_TYPE from '@/constant/DATA_TYPE';

import Confirm from '@/component/dialog/Confirm';
import Dropdown from '@/component/input/Dropdown';
import ShortText from '@/component/input/ShortText';
import Table from '@/component/table';
import Toggle from '@/component/input/Toggle';

import {ErrorContext} from '@/context/ErrorProvider';
import {generateValidation} from '@/helper/validator';
import mockColumns from '@/mock/field/column';

const FieldForm = props => {
    const {fieldRows, setFieldRows} = props;

    const formGroupName = 'fieldForm';
    const fieldTypeOptions = Object.values(DATA_TYPE);

    const {errors, clearError, groupError} = useContext(ErrorContext);
    const disabledSaveButton = groupError([formGroupName], errors);

    const [openFieldForm, setOpenFieldForm] = useState(false);
    const [fieldName, setFieldName] = useState(null);
    const [fieldLabel, setFieldLabel] = useState(null);
    const [fieldType, setFieldType] = useState(null);
    const [fieldSettings, setFieldSettings] = useState({
        tableRef: null,
        tableRefKey: null,
        tableRefName: null,
        primaryKey: false,
        multiSelect: false,
    });
    const [primaryExist, setPrimaryExist] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [rowSelected, setRowSelected] = useState(false);
    const [fieldNameRule, setFieldNameRule] = useState('required|field_name');

    const openFieldFormACTION_TYPE = 6;
    const toolbarCustomAction = [
        {
            type: openFieldFormACTION_TYPE,
            label: 'Add New Field',
        },
    ];
    const action = [
        {
            type: ACTION_TYPE.update.value,
            path: '/',
        },
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
            tableRef: null,
            tableRefKey: null,
            tableRefName: null,
            primaryKey: false,
            multiSelect: false,
        });
    };

    const clearErrorGroup = () => {
        const names = ['tableRef', 'tableRefName', 'tableRefKey'];
        for (let index = 0; index < names.length; index++) {
            const name = names[index];
            clearError(formGroupName, name);
        }
    };

    const deleteField = () => {
        if (rowSelected.primaryKey) setPrimaryExist(false);

        const newFieldrows = fieldRows.filter(field => field.id !== rowSelected.id);
        setFieldRows(newFieldrows);
        changeFieldNameRule(ACTION_TYPE.delete.value, rowSelected.name);
    };

    const deleteConfirmation = confirm => {
        if (confirm) deleteField();
        setOpenConfirmDialog(false);
    };

    const onClickToolbarAction = action => {
        if (action.type === openFieldFormACTION_TYPE) {
            setFieldName(null);
            setFieldLabel(null);
            setFieldType(null);
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

    const onChangeFieldType = value => {
        clearFieldSettings();
        clearErrorGroup();
        setFieldType(value);
    };

    const changeFieldNameRule = (action, name) => {
        const newRule = generateValidation(action, 'same', name, fieldNameRule);
        setFieldNameRule(newRule);
    };

    const onSave = () => {
        if (fieldSettings.primaryKey) setPrimaryExist(true);

        const newId = fieldRows.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
        const newRows = {
            id: newId,
            name: fieldName,
            label: fieldLabel,
            DATA_TYPE: fieldType,
            tableRef: fieldSettings.tableRef,
            tableRefKey: fieldSettings.tableRefKey,
            tableRefName: fieldSettings.tableRefName,
            multiSelect: fieldSettings.multiSelect,
            primaryKey: fieldSettings.primaryKey,
        };
        changeFieldNameRule(ACTION_TYPE.insert.value, fieldName);
        setFieldRows([...fieldRows, newRows]);
        setOpenFieldForm(false);
    };

    const refTableSettings = () => {
        if (fieldType.value !== DATA_TYPE.tableReference.value) return false;

        return (
            <Box display="flex" flexDirection="column" gap={2}>
                <ShortText
                    label="Table Reference"
                    name="tableRef"
                    group={formGroupName}
                    value={fieldSettings.tableRef}
                    onChange={value => changeSettingValue('tableRef', value)}
                    rules="required"
                />
                <ShortText
                    label="Table Reference Key"
                    name="tableRefKey"
                    group={formGroupName}
                    value={fieldSettings.tableRefKey}
                    onChange={value => changeSettingValue('tableRefKey', value)}
                    rules="required"
                />
                <ShortText
                    label="Table Reference Name"
                    name="tableRefName"
                    group={formGroupName}
                    value={fieldSettings.tableRefName}
                    onChange={value => changeSettingValue('tableRefName', value)}
                    rules="required"
                />
                <Box display="flex" gap={2}>
                    <Toggle
                        label="Multi Select"
                        value={fieldSettings.multiSelect}
                        onChange={value => changeSettingValue('multiSelect', value)}
                    />
                </Box>
            </Box>
        );
    };

    const primaryKeySetting = () => {
        if (
            fieldType.value !== DATA_TYPE.autoIncrement.value &&
            fieldType.value !== DATA_TYPE.integer.value &&
            fieldType.value !== DATA_TYPE.varchar.value
        )
            return false;

        return (
            <Box>
                <Toggle
                    label="Is Primary Key"
                    value={fieldSettings.primaryKey}
                    disabled={primaryExist}
                    onChange={value => changeSettingValue('primaryKey', value)}
                />
            </Box>
        );
    };

    const fieldSettingsComponent = () => {
        if (!fieldType) return false;

        if (
            fieldType.value !== DATA_TYPE.autoIncrement.value &&
            fieldType.value !== DATA_TYPE.integer.value &&
            fieldType.value !== DATA_TYPE.varchar.value &&
            fieldType.value !== DATA_TYPE.tableReference.value
        )
            return false;

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
                {primaryKeySetting()}
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
                        <Button variant="contained" size="small" onClick={onSave} disabled={disabledSaveButton}>
                            Add
                        </Button>
                        <Button variant="outlined" size="small" onClick={() => setOpenFieldForm(false)}>
                            Cancel
                        </Button>
                    </Box>
                    <Box width={500} display="flex" flexDirection="column" gap={2}>
                        <ShortText
                            label="Name"
                            name="name"
                            group="fieldForm"
                            value={fieldName}
                            onChange={setFieldName}
                            rules={fieldNameRule}
                        />
                        <ShortText
                            label="Label"
                            name="label"
                            group="fieldForm"
                            value={fieldLabel}
                            onChange={setFieldLabel}
                            rules="required"
                        />
                        <Dropdown
                            label="Data Type"
                            name="DATA_TYPE"
                            group="fieldForm"
                            options={fieldTypeOptions}
                            value={fieldType}
                            onChange={onChangeFieldType}
                            rules="required"
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
