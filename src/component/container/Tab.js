import {useState} from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import MuiTab from '@/alias/MuiTab';

const CustomTabPanel = props => {
    const {children, value, index, ...other} = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && children}
        </Box>
    );
};

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Tab = props => {
    const {label, section, renderComponent} = props;

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const header = () => {
        if (Array.isArray(label)) {
            return (
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange}>
                        {label &&
                            label.length > 0 &&
                            label.map((item, index) => <MuiTab key={index} label={item} {...a11yProps(index)} colo />)}
                    </Tabs>
                </Box>
            );
        } else {
            return <Typography fontSize={12}>Label is not valid.</Typography>;
        }
    };

    const content = () => {
        if (section && section.length > 0) {
            return section.map((childs, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    {childs.map(renderComponent)}
                </CustomTabPanel>
            ));
        }
    };

    return (
        <Box>
            {header()}
            <Box padding={1}>{content()}</Box>
        </Box>
    );
};

export default Tab;
