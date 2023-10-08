import {useState} from 'react';
import {Dialog, DialogContent, DialogActions, Button} from '@mui/material';
import {Dropdown} from '../input';
import {input_type} from '@/constant';

const ExportDialog = props => {
    const {openExportDialog, setOpenExportDialog, onDownload} = props;

    const export_row_type = [
        {key: 1, value: 'selected', label: 'Selected'},
        {key: 2, value: 'current', label: 'Current'},
        {key: 3, value: 'all', label: 'All'},
    ];
    const export_row_extention = [
        {value: '.xlsx', label: 'Excel'},
        {value: '.txt', label: 'Text'},
        {value: '.pdf', label: 'PDF'},
    ];

    const [exportSelectionType, setExportSelectionType] = useState(null);
    const [exportExtentionType, setExportExtentionType] = useState(null);

    return (
        <Dialog open={openExportDialog}>
            <DialogContent
                style={{
                    width: '20rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                <Dropdown
                    type={input_type.dropdown.value}
                    label="Selection"
                    options={export_row_type}
                    onChange={setExportSelectionType}
                    value={exportSelectionType}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                />
                <Dropdown
                    type={input_type.dropdown.value}
                    label="Extention"
                    options={export_row_extention}
                    onChange={setExportExtentionType}
                    value={exportExtentionType}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={() => setOpenExportDialog(false)}>
                    Cancel
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                        onDownload({
                            selection: exportSelectionType.value,
                            extention: exportExtentionType.value,
                        })
                    }
                    variant="contained">
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportDialog;
