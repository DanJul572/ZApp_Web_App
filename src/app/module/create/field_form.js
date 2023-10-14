import {useState} from 'react';
import {Table} from '@/component';
import mockColumns from '@/mock/field/column';
import {Box, Button, Drawer, colors} from '@mui/material';
import {Dropdown, Number, ShortText, Toggle} from '@/component/input';
import {inputType} from '@/constant';
import dataType from '@/constant/data_type';

const FieldForm = () => {
    const [openFieldForm, setOpenFieldForm] = useState(false);
    const [fieldName, setFieldName] = useState('');
    const [fieldLabel, setFieldLabel] = useState('');
    const [controlType, setControlType] = useState(null);
    const [fieldSettings, setFieldSettings] = useState({
        size: null,
        dataType: null,
        tableRef: null,
        tableRefKey: null,
        tableRefName: null,
        isPrimary: false,
    });

    const openFieldFormActionType = 6;
    const toolbarCustomAction = [
        {
            type: openFieldFormActionType,
            label: 'Add New Field',
        },
    ];
    const controlTypeOptions = Object.values(inputType);

    const dataTypeOptions = () => {
        if (controlType.value === inputType.number.value)
            return Object.values(dataType).filter(
                type =>
                    type.value === dataType.autoIncrement.value ||
                    type.value === dataType.int.value,
            );

        if (controlType.value === inputType.shortText.value)
            return Object.values(dataType).filter(type => type.value === dataType.varchar.value);

        if (controlType.value === inputType.longText.value)
            return Object.values(dataType).filter(
                type => type.value === dataType.text.value || type.value === dataType.varchar.value,
            );
    };

    const changeSettingValue = (key, value) => {
        setFieldSettings(prevState => ({...prevState, [key]: value}));
    };

    const onClickToolbarAction = action => {
        if (action.type === openFieldFormActionType) setOpenFieldForm(true);
    };

    const onChangeControlType = value => {
        setFieldSettings({
            size: null,
            dataType: null,
            tableRef: null,
            tableRefKey: null,
            tableRefName: null,
            isPrimary: false,
        });
        setControlType(value);
    };

    const sizeSettings = () => {
        if (
            controlType.value !== inputType.shortText.value &&
            controlType.value !== inputType.longText.value
        )
            return false;

        return (
            <Box>
                <Number
                    label="Size"
                    value={fieldSettings.size}
                    rules="required"
                    onChange={value => changeSettingValue('size', value)}
                />
            </Box>
        );
    };

    const dataTypeSettings = () => {
        if (
            controlType.value !== inputType.shortText.value &&
            controlType.value !== inputType.longText.value &&
            controlType.value !== inputType.number.value
        )
            return false;

        return (
            <Dropdown
                label="Data Type"
                options={dataTypeOptions()}
                value={fieldSettings.dataType}
                onChange={value => changeSettingValue('dataType', value)}
                rules="required"
            />
        );
    };

    const refTableSettings = () => {
        if (
            controlType.value !== inputType.dropdown.value &&
            controlType.value !== inputType.checkbox.value
        )
            return false;
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
            </Box>
        );
    };

    const isPrimarySetting = () => {
        if (
            controlType.value !== inputType.number.value &&
            controlType.value !== inputType.shortText.value &&
            controlType.value !== inputType.longText.value
        )
            return false;

        return (
            <Box marginTop={1}>
                <Toggle
                    label="Is Primary Key"
                    value={fieldSettings.isPrimary}
                    onChange={value => changeSettingValue('isPrimary', value)}
                />
            </Box>
        );
    };

    return (
        <>
            <Table
                columnKey={'id'}
                columns={mockColumns}
                onClickRowAction={() => {}}
                onClickToolbarAction={onClickToolbarAction}
                toolbarCustomAction={toolbarCustomAction}
                rows={[]}
            />
            <Drawer anchor="right" open={openFieldForm} onClose={() => setOpenFieldForm(false)}>
                <Box padding={2}>
                    <Box display="flex" justifyContent="flex-end" gap={2} marginBottom={2}>
                        <Button variant="contained" size="small">
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
                            rules="required"
                        />
                        <ShortText
                            label="Label"
                            value={fieldLabel}
                            onChange={setFieldLabel}
                            rules="required"
                        />
                        <Dropdown
                            label="Control Type"
                            options={controlTypeOptions}
                            value={controlType}
                            onChange={onChangeControlType}
                            rules="required"
                        />
                    </Box>
                    {controlType && (
                        <Box
                            marginY={2}
                            border={1}
                            padding={2}
                            borderRadius={1}
                            borderColor={colors.grey[300]}
                            display="flex"
                            flexDirection="column"
                            gap={2}>
                            {dataTypeSettings()}
                            {sizeSettings()}
                            {refTableSettings()}
                            {isPrimarySetting()}
                        </Box>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default FieldForm;
