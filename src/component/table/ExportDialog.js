import {useState} from 'react';

import {download, generateCsv, mkConfig} from 'export-to-csv';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Dropdown from '@/component/input/Dropdown';

const ExportDialog = props => {
    const {columns, openExportDialog, setOpenExportDialog, table} = props;

    const rowType = [
        {value: 'selected', label: 'Selected'},
        {value: 'current', label: 'Current'},
        {value: 'all', label: 'All'},
    ];
    const extentionType = [
        {value: '.csv', label: 'CSV'},
        {value: '.pdf', label: 'PDF'},
    ];

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    const [exportSelectionType, setExportSelectionType] = useState(null);
    const [exportExtentionType, setExportExtentionType] = useState(null);

    const exportAsPDF = rows => {
        const doc = new jsPDF();
        const tableData = rows.map(row => Object.values(row.original));
        const tableHeaders = columns.map(c => c.header);

        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
        });

        doc.save('mrt-pdf-example.pdf');
    };

    const exportAsCSV = rows => {
        const rowData = rows.map(row => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportRows = () => {
        let rows = [];
        if (exportSelectionType === rowType[0].value) {
            rows = table.getSelectedRowModel().rows;
        } else if (exportSelectionType === rowType[1].value) {
            rows = table.getRowModel().rows;
        } else {
            rows = table.getPrePaginationRowModel().rows;
        }

        if (exportExtentionType === extentionType[0].value) {
            exportAsCSV(rows);
        } else {
            exportAsPDF(rows);
        }

        setOpenExportDialog(false);
    };

    return (
        <Dialog open={openExportDialog}>
            <DialogContent
                sx={{
                    width: '20rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                <Dropdown
                    label="Selection"
                    options={rowType}
                    onChange={setExportSelectionType}
                    value={exportSelectionType}
                    size="small"
                    rules="required"
                />
                <Dropdown
                    label="Extention"
                    options={extentionType}
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
                <Button size="small" onClick={handleExportRows} variant="contained">
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportDialog;
