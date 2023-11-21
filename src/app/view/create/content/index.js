import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import useTheme from '@mui/material/styles/useTheme';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import COMPONENT_GROUP_TYPE from '@/constant/COMPONENT_GROUP_TYPE';

import Button from './Button';
import Container from './Container';
import DataDisplay from './DataDisplay';
import FieldControl from './FieldControl';
import VisualElement from './VisualElement';

const Content = props => {
    const theme = useTheme();

    const {content, selected, setSelected} = props;

    const Wraper = ({children, component}) => {
        return (
            <Box
                key={component.id}
                border={selected && component.id === selected.id ? 1 : 0}
                borderColor={theme.palette.primary.main}
                padding={1}
                paddingBottom={0}
                borderRadius={1}>
                {children}
                <Tooltip arrow title={component.type.label} placement="left">
                    <IconButton onClick={() => setSelected(component)} size="small" style={{padding: 0}}>
                        <MoreHorizIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        );
    };

    const renderComponent = component => {
        let id = component.id;
        let group = component.group.value;
        let type = component.type.value;
        let section = component.section;
        let properties = component.properties;

        if (group === COMPONENT_GROUP_TYPE.container.value) {
            return (
                <Wraper key={id} component={component}>
                    <Container type={type} section={section} properties={properties} renderComponent={renderComponent} />
                </Wraper>
            );
        } else if (group === COMPONENT_GROUP_TYPE.fieldControl.value) {
            return (
                <Wraper key={id} component={component}>
                    <FieldControl type={type} properties={properties} />
                </Wraper>
            );
        } else if (group === COMPONENT_GROUP_TYPE.visualElement.value) {
            return (
                <Wraper key={id} component={component}>
                    <VisualElement type={type} properties={properties} />
                </Wraper>
            );
        } else if (group === COMPONENT_GROUP_TYPE.dataDisplay.value) {
            return (
                <Wraper key={id} component={component}>
                    <DataDisplay type={type} />
                </Wraper>
            );
        } else if (group === COMPONENT_GROUP_TYPE.button.value) {
            return (
                <Wraper key={id} component={component}>
                    <Button type={type} properties={properties} />
                </Wraper>
            );
        }
    };

    return (
        <Grid item xs={8} marginX={40}>
            {content && content.length > 0 && content.map(component => renderComponent(component))}
        </Grid>
    );
};

export default Content;
