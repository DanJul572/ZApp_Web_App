import {useState} from 'react';
import {Table} from '@/component';
import mockColumns from '@/mock/field/column';
import {Box, Button, Drawer, colors} from '@mui/material';
import {Dropdown, Number, ShortText} from '@/component/input';
import {inputType} from '@/constant';

const FieldForm = () => {
    const [openFieldForm, setOpenFieldForm] = useState(false);
    const [fieldName, setFieldName] = useState('');
    const [fieldLabel, setFieldLabel] = useState('');
    const [fieldType, setFieldType] = useState(null);
    const [fieldSettings, setFieldSettings] = useState({
        size: null,
    });

    const openFieldFormActionType = 6;
    const toolbarCustomAction = [
        {
            type: openFieldFormActionType,
            label: 'Add New Field',
        },
    ];
    const typeOptions = Object.values(inputType);

    const sizeSettings = () => {
        if (
            fieldType.value !== inputType.text.value &&
            fieldType.value !== inputType.long_text.value
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

    const changeSettingValue = (key, value) => {
        setFieldSettings(prevState => ({...prevState, [key]: value}));
    };

    const onClickToolbarAction = action => {
        if (action.type === openFieldFormActionType) setOpenFieldForm(true);
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
                            options={typeOptions}
                            value={fieldType}
                            onChange={setFieldType}
                            rules="required"
                        />
                    </Box>
                    {fieldType && (
                        <Box
                            marginY={2}
                            border={1}
                            padding={2}
                            borderRadius={1}
                            borderColor={colors.grey[300]}>
                            {sizeSettings()}
                        </Box>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default FieldForm;
