import {useState} from 'react';
import {Table} from '@/component';
import mockColumns from '@/mock/field/column';
import {Box, Button, Drawer, colors} from '@mui/material';
import {Dropdown, ShortText, Toggle} from '@/component/input';
import {actionType} from '@/constant';
import dataType from '@/constant/data_type';

const FieldForm = props => {
    const {fieldRows, setFieldRows} = props;

    const [openFieldForm, setOpenFieldForm] = useState(false);
    const [fieldName, setFieldName] = useState(null);
    const [fieldLabel, setFieldLabel] = useState(null);
    const [fieldType, setFieldType] = useState(null);
    const [fieldSettings, setFieldSettings] = useState({
        tableRef: null,
        tableRefKey: null,
        tableRefName: null,
        primaryKey: false,
        deleteCascade: false,
        updateCascade: false,
        multiSelect: false,
    });
    const [primaryExist, setPrimaryExist] = useState(false);

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

    const fieldTypeOptions = Object.values(dataType);

    const changeSettingValue = (key, value) => {
        setFieldSettings(prevState => ({...prevState, [key]: value}));
    };

    const clearFieldSettings = () => {
        setFieldSettings({
            tableRef: null,
            tableRefKey: null,
            tableRefName: null,
            primaryKey: false,
            deleteCascade: false,
            updateCascade: false,
            multiSelect: false,
        });
    };

    const deleteField = row => {
        if (row.primaryKey) setPrimaryExist(false);

        const newFieldrows = fieldRows.filter(field => field.id !== row.id);
        setFieldRows(newFieldrows);
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
        if (data.action.value === actionType.delete.value) deleteField(data.row);
    };

    const onChangeFieldType = value => {
        clearFieldSettings();
        setFieldType(value);
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
            deleteCascade: fieldSettings.deleteCascade,
            updateCascade: fieldSettings.updateCascade,
            multiSelect: fieldSettings.multiSelect,
            primaryKey: fieldSettings.primaryKey,
        };
        setFieldRows([...fieldRows, newRows]);
        setOpenFieldForm(false);
    };

    const refTableSettings = () => {
        if (fieldType.value !== dataType.foreignKey.value) return false;

        return (
            <Box display="flex" flexDirection="column" gap={2}>
                <ShortText
                    label="Table Reference"
                    value={fieldSettings.tableRef}
                    onChange={value => changeSettingValue('tableRef', value)}
                    rules="required"
                />
                <ShortText
                    label="Table Reference Key"
                    value={fieldSettings.tableRefKey}
                    onChange={value => changeSettingValue('tableRefKey', value)}
                    rules="required"
                />
                <ShortText
                    label="Table Reference Name"
                    value={fieldSettings.tableRefName}
                    onChange={value => changeSettingValue('tableRefName', value)}
                    rules="required"
                />
                <Box display="flex" gap={2}>
                    <Toggle
                        label="Delete Cascade"
                        value={fieldSettings.deleteCascade}
                        onChange={value => changeSettingValue('deleteCascade', value)}
                    />
                    <Toggle
                        label="Update Cascade"
                        value={fieldSettings.updateCascade}
                        onChange={value => changeSettingValue('updateCascade', value)}
                    />
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
            fieldType.value !== dataType.foreignKey.value
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
                        <Button variant="contained" size="small" onClick={onSave}>
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
                            value={fieldName}
                            onChange={setFieldName}
                            rules="required|field_name"
                        />
                        <ShortText
                            label="Label"
                            value={fieldLabel}
                            onChange={setFieldLabel}
                            rules="required"
                        />
                        <Dropdown
                            label="Data Type"
                            options={fieldTypeOptions}
                            value={fieldType}
                            onChange={onChangeFieldType}
                            rules="required"
                        />
                    </Box>
                    {fieldSettingsComponent()}
                </Box>
            </Drawer>
        </>
    );
};

export default FieldForm;
