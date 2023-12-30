import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';

import ViewModule from '@mui/icons-materia/ViewModulel';
import Dashboard from '@mui/icons-material/Dashboard';
import DataArray from '@mui/icons-material/DataArraySharp';
import DataObject from '@mui/icons-material/DataObject';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';

import grey from '@mui/material/colors/grey';

const Navigation = props => {
    const {navigationType, activeNavigation, setActiveNavigation} = props;

    const handleChange = (event, newValue) => {
        setActiveNavigation(newValue);
    };

    return (
        <Box marginBottom={1} borderBottom={1} borderColor={grey[300]} position="sticky" top={64} zIndex={2}>
            <BottomNavigation showLabels value={activeNavigation} onChange={handleChange}>
                <BottomNavigationAction
                    value={navigationType.content}
                    label="Content"
                    icon={<Dashboard fontSize="small" />}
                />
                <BottomNavigationAction
                    value={navigationType.variable}
                    label="Variable"
                    icon={<DataArray fontSize="small" />}
                />
                <BottomNavigationAction
                    value={navigationType.function}
                    label="Function"
                    icon={<DataObject fontSize="small" />}
                />
                <BottomNavigationAction
                    value={navigationType.page}
                    label="Page"
                    icon={<InsertDriveFileOutlined fontSize="small" />}
                />
                <BottomNavigationAction
                    value={navigationType.module}
                    label="Module"
                    icon={<ViewModule fontSize="small" />}
                />
            </BottomNavigation>
        </Box>
    );
};

export default Navigation;
