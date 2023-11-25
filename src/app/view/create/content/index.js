import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import useTheme from '@mui/material/styles/useTheme';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import CComponentGroupType from '@/constant/CComponentGroupType';

import {useBuilder} from '@/context/BuilderProvider';

import Button from './Button';
import Chart from './Chart';
import Container from './Container';
import FieldControl from './FieldControl';
import Tables from './Tables';
import VisualElement from './VisualElement';

const Content = props => {
    const theme = useTheme();

    // eslint-disable-next-line no-unused-vars
    const {vars} = useBuilder();

    const {content, selected, setSelected} = props;

    const getStyles = styles => {
        try {
            return styles ? JSON.parse(styles) : {};
        } catch (error) {
            console.log(`Error : ${error.message}`);
            return {};
        }
    };

    const getLabel = func => {
        try {
            return eval(func);
        } catch (error) {
            console.log(`Error : ${error.message}`);
            return;
        }
    };

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
                    <IconButton onClick={() => setSelected(component)} size="small" sx={{padding: 0}}>
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
        let parse = {};

        parse.styles = getStyles(properties.styles);
        parse.label = getLabel(properties.label);

        if (group === CComponentGroupType.container.value) {
            return (
                <Wraper key={id} component={component}>
                    <Container
                        type={type}
                        section={section}
                        properties={properties}
                        renderComponent={renderComponent}
                        parse={parse}
                    />
                </Wraper>
            );
        } else if (group === CComponentGroupType.fieldControl.value) {
            return (
                <Wraper key={id} component={component}>
                    <FieldControl type={type} properties={properties} parse={parse} />
                </Wraper>
            );
        } else if (group === CComponentGroupType.visualElement.value) {
            return (
                <Wraper key={id} component={component}>
                    <VisualElement type={type} properties={properties} parse={parse} />
                </Wraper>
            );
        } else if (group === CComponentGroupType.table.value) {
            return (
                <Wraper key={id} component={component}>
                    <Tables type={type} />
                </Wraper>
            );
        } else if (group === CComponentGroupType.chart.value) {
            return (
                <Wraper key={id} component={component}>
                    <Chart type={type} />
                </Wraper>
            );
        } else if (group === CComponentGroupType.button.value) {
            return (
                <Wraper key={id} component={component}>
                    <Button type={type} properties={properties} />
                </Wraper>
            );
        }
    };

    return (
        <Grid item xs={8} marginX={40}>
            {content && content.length > 0 && content.map(renderComponent)}
        </Grid>
    );
};

export default Content;
