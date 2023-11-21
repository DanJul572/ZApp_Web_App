import {useState} from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Dropdown from '@/component/input/Dropdown';

const ExportDialog = props => {
    const {openExportDialog, setOpenExportDialog, onDownload} = props;

    const exportRowType = [
        {value: 'selected', label: 'Selected'},
        {value: 'current', label: 'Current'},
        {value: 'all', label: 'All'},
    ];
    const exportRowSelection = [
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
                    label="Selection"
                    options={exportRowType}
                    onChange={setExportSelectionType}
                    value={exportSelectionType}
                    size="small"
                    rules="required"
                />
                <Dropdown
                    label="Extention"
                    options={exportRowSelection}
                    onChange={setExportExtentionType}
                    value={exportExtentionType}
                    size="small"
                    rules="required"
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={() => setOpenExportDialog(false)}>
                    Cancel
                </Button>
                <Button
                    size="small"
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
