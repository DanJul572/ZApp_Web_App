import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import useTheme from '@mui/material/styles/useTheme';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import CComponentGroupType from '@/constant/CComponentGroupType';
import CTheme from '@/constant/CTheme';

import Button from './Button';
import Chart from './Chart';
import Container from './Container';
import FieldControl from './FieldControl';
import Table from './Table';
import VisualElement from './VisualElement';

import Page from './shared/Page';

const Interpreter = props => {
    const theme = useTheme();

    const {isPreview, isBuilder, content, page, selected, setSelected} = props;

    const Wraper = ({children, component}) => {
        if (!isBuilder) return <Box marginBottom={1}>{children}</Box>;
        const selectedBorder = selected && component.id === selected.id ? CTheme.border.size.value : 0;
        return (
            <Box
                border={selectedBorder}
                borderColor={theme.palette.primary.main}
                borderRadius={1}
                key={component.id}
                padding={1}
                paddingBottom={0}>
                {children}
                <Tooltip arrow title={component.type.label} placement="left">
                    <IconButton onClick={() => setSelected(component)} size={CTheme.button.size.name} sx={{padding: 0}}>
                        <MoreHorizIcon fontSize={CTheme.font.size.name} />
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

        if (group === CComponentGroupType.container.value) {
            return (
                <Wraper key={id} component={component}>
                    <Container
                        isBuilder={isBuilder}
                        properties={properties}
                        renderComponent={renderComponent}
                        section={section}
                        type={type}
                    />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.fieldControl.value) {
            return (
                <Wraper key={id} component={component}>
                    <FieldControl type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.visualElement.value) {
            return (
                <Wraper key={id} component={component}>
                    <VisualElement type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.table.value) {
            return (
                <Wraper key={id} component={component}>
                    <Table type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.chart.value) {
            return (
                <Wraper key={id} component={component}>
                    <Chart type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.button.value) {
            return (
                <Wraper key={id} component={component}>
                    <Button type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }
    };

    return (
        <Page isBuilder={isBuilder} page={page} isPreview={isPreview}>
            {content && content.length > 0 && Array.isArray(content) ? content.map(renderComponent) : content}
        </Page>
    );
};

export default Interpreter;
