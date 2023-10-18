import {useContext, useState} from 'react';
import {Table} from '@/component';
import mockColumns from '@/mock/field/column';
import {Box, Button, Drawer, colors} from '@mui/material';
import {Dropdown, ShortText, Toggle} from '@/component/input';
import {actionType} from '@/constant';
import dataType from '@/constant/data_type';
import {Confirm} from '@/component/dialog';
import {generateValidation} from '@/helper/validator';
import {ErrorContext} from '@/context/error_provider';

const FieldForm = props => {
    const {fieldRows, setFieldRows} = props;

    const formGroupName = 'fieldForm';
    const fieldTypeOptions = Object.values(dataType);

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

    const openFieldFormActionType = 6;
    const toolbarCustomAction = [
        {
            type: openFieldFormActionType,
            label: 'Add New Field',
        },
    ];
    const action = [
        {
            type: actionType.update.value,
            path: '/',
        },
        {
            type: actionType.delete.value,
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
        changeFieldNameRule(actionType.delete.value, rowSelected.name);
    };

    const deleteConfirmation = confirm => {
        if (confirm) deleteField();
        setOpenConfirmDialog(false);
    };

    const onClickToolbarAction = action => {
        if (action.type === openFieldFormActionType) {
            setFieldName(null);
            setFieldLabel(null);
            setFieldType(null);
            clearFieldSettings();
            setOpenFieldForm(true);
        }
    };

    const onClickRowAction = data => {
        if (data.action.value === actionType.delete.value) {
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
            dataType: fieldType,
            tableRef: fieldSettings.tableRef,
            tableRefKey: fieldSettings.tableRefKey,
            tableRefName: fieldSettings.tableRefName,
            multiSelect: fieldSettings.multiSelect,
            primaryKey: fieldSettings.primaryKey,
        };
        changeFieldNameRule(actionType.insert.value, fieldName);
        setFieldRows([...fieldRows, newRows]);
        setOpenFieldForm(false);
    };

    const refTableSettings = () => {
        if (fieldType.value !== dataType.select.value) return false;

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
            fieldType.value !== dataType.autoIncrement.value &&
            fieldType.value !== dataType.integer.value &&
            fieldType.value !== dataType.varchar.value
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
            fieldType.value !== dataType.autoIncrement.value &&
            fieldType.value !== dataType.integer.value &&
            fieldType.value !== dataType.varchar.value &&
            fieldType.value !== dataType.select.value
        )
            return false;

        return (
            <Box
                marginY={2}
                border={1}
                padding={2}
                borderRadius={1}
                borderColor={colors.grey[300]}
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
                        <Button
                            variant="contained"
                            size="small"
                            onClick={onSave}
                            disabled={disabledSaveButton}>
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setOpenFieldForm(false)}>
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
                            name="dataType"
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
