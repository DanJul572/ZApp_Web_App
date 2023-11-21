import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';

import Dashboard from '@mui/icons-material/Dashboard';
import DataArray from '@mui/icons-material/DataArraySharp';
import DataObject from '@mui/icons-material/DataObject';
import Home from '@mui/icons-material/Home';

import grey from '@mui/material/colors/grey';

const Navigation = props => {
    const {navigationType, activeNavigation, setActiveNavigation} = props;

    const handleChange = (event, newValue) => {
        setActiveNavigation(newValue);
    };

    return (
        <Box width="100%" marginTop={7} marginX={39} marginBottom={1} borderBottom={1} borderColor={grey[300]}>
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
                <BottomNavigationAction value={navigationType.module} label="Module" icon={<Home fontSize="small" />} />
            </BottomNavigation>
        </Box>
    );
};

export default Navigation;
