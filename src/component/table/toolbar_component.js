import {Download, Storage} from '@mui/icons-material';
import {Box, IconButton, Tooltip} from '@mui/material';
import {
    MRT_ToggleFiltersButton,
    MRT_ToggleGlobalFilterButton,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_FullScreenToggleButton,
} from 'material-react-table';

const ToolBarComponent = props => {
    const {
        enableSearch,
        enableFilter,
        enableAdvanceFilter,
        enableHiding,
        enableDensityToggle,
        enableFullScreenToggle,
        enableExport,
        setOpenAdvanceFilterDialog,
        setOpenExportDialog,
        table,
    } = props;

    const advanceFilterButton = (
        <Tooltip arrow title="Advance Filter">
            <IconButton onClick={() => setOpenAdvanceFilterDialog(true)}>
                <Storage />
            </IconButton>
        </Tooltip>
    );

    const exportButton = (
        <Tooltip arrow title="Download">
            <IconButton onClick={() => setOpenExportDialog(true)}>
                <Download />
            </IconButton>
        </Tooltip>
    );

    return (
        <Box>
            {enableSearch && <MRT_ToggleGlobalFilterButton table={table} />}
            {enableFilter && <MRT_ToggleFiltersButton table={table} />}
            {enableAdvanceFilter && advanceFilterButton}
            {enableHiding && <MRT_ShowHideColumnsButton table={table} />}
            {enableDensityToggle && <MRT_ToggleDensePaddingButton table={table} />}
            {enableFullScreenToggle && <MRT_FullScreenToggleButton table={table} />}
            {enableExport && exportButton}
        </Box>
    );
};

export default ToolBarComponent;
