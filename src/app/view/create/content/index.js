import blue from '@mui/material/colors/blue';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Dropdown from '@/component/input/Dropdown';
import LongText from '@/component/input/LongText';
import Number from '@/component/input/Number';
import ShortText from '@/component/input/ShortText';
import Table from '@/component/table';
import Toggle from '@/component/input/Toggle';

import BUTTON_TYPE from '@/constant/BUTTON_TYPE';
import COMPONENT_GROUP_TYPE from '@/constant/COMPONENT_GROUP_TYPE';
import CONTAINER_TYPE from '@/constant/CONTAINER_TYPE';
import DATA_DISPLAY_TYPE from '@/constant/DATA_DISPLAY';
import INPUT_TYPE from '@/constant/INPUT_TYPE';
import VISUAL_ELEMENT_TYPE from '@/constant/VISUAL_ELEMENT_TYPE';

import mockColumns from '@/mock/table/columns';
import mockRows from '@/mock/table/rows';

const Content = props => {
    const {content, selected, setSelected} = props;

    const Container = ({children, component}) => {
        return (
            <Box
                key={component.id}
                border={selected && component.id === selected.id ? 1 : 0}
                borderColor={blue[300]}
                padding={1}
                paddingBottom={0}
                borderRadius={1}>
                {children}
                <Tooltip arrow title={component.type.label} placement="left">
                    <IconButton onClick={() => setSelected(component)} size="small" style={{padding: 0}}>
                        <MoreHorizIcon fontSize="10" />
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
            if (type === CONTAINER_TYPE.card.value) {
                return (
                    <Container key={id} component={component}>
                        <Box
                            border={section.length ? 1 : 0}
                            borderColor={grey[300]}
                            borderRadius={1}
                            height="100%"
                            padding={section.length ? 1 : 0}>
                            <Typography fontSize={10} fontWeight="bold">
                                Card
                            </Typography>
                            <Box>
                                {section &&
                                    section.length > 0 &&
                                    section.map(childs => childs.map(child => renderComponent(child)))}
                            </Box>
                        </Box>
                    </Container>
                );
            } else if (type === CONTAINER_TYPE.grid.value) {
                let containerSize = properties.size ? properties.size.split(',') : false;
                return (
                    <Container key={id} component={component}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography fontSize={10} fontWeight="bold">
                                    Grid
                                </Typography>
                            </Grid>
                            {section &&
                                section.map((childs, index) => (
                                    <Grid
                                        item
                                        xs={containerSize.length > 0 ? containerSize[index] : 12 / section.length}
                                        key={index}>
                                        {childs.map(child => renderComponent(child))}
                                    </Grid>
                                ))}
                        </Grid>
                    </Container>
                );
            }
        } else if (group === COMPONENT_GROUP_TYPE.fieldControl.value) {
            if (type === INPUT_TYPE.shortText.value) {
                return (
                    <Container key={id} component={component}>
                        <ShortText disabled={true} label={properties.label || INPUT_TYPE.shortText.label} />
                    </Container>
                );
            } else if (type === INPUT_TYPE.longText.value) {
                return (
                    <Container key={id} component={component}>
                        <LongText disabled={true} rows={4} label={properties.label || INPUT_TYPE.longText.label} />
                    </Container>
                );
            } else if (type === INPUT_TYPE.number.value) {
                return (
                    <Container key={id} component={component}>
                        <Number disabled={true} label={properties.label || INPUT_TYPE.number.label} />
                    </Container>
                );
            } else if (type === INPUT_TYPE.toggle.value) {
                return (
                    <Container key={id} component={component}>
                        <Toggle disabled={true} label={properties.label || INPUT_TYPE.toggle.label} />
                    </Container>
                );
            } else if (type === INPUT_TYPE.dropdown.value) {
                return (
                    <Container key={id} component={component}>
                        <Dropdown options={[]} disabled={true} label={properties.label || INPUT_TYPE.dropdown.label} />
                    </Container>
                );
            }
        } else if (group === COMPONENT_GROUP_TYPE.visualElement.value) {
            if (type === VISUAL_ELEMENT_TYPE.divider.value) {
                return (
                    <Container key={id} component={component}>
                        <Divider />
                    </Container>
                );
            } else if (type === VISUAL_ELEMENT_TYPE.text.value) {
                return (
                    <Container key={id} component={component}>
                        <Typography fontSize={12}>{properties.label || VISUAL_ELEMENT_TYPE.text.label}</Typography>
                    </Container>
                );
            }
        } else if (group === COMPONENT_GROUP_TYPE.dataDisplay.value) {
            if (type === DATA_DISPLAY_TYPE.table.value) {
                return (
                    <Container key={id} component={component}>
                        <Table columnKey={'id'} columns={mockColumns} rows={mockRows} />
                    </Container>
                );
            }
        } else if (group === COMPONENT_GROUP_TYPE.button.value) {
            if (type === BUTTON_TYPE.button.value) {
                return (
                    <Container key={id} component={component}>
                        <Button size="small" variant="contained" style={{display: 'block'}}>
                            {properties.label || BUTTON_TYPE.button.label}
                        </Button>
                    </Container>
                );
            }
        }
    };

    return (
        <Grid item xs={8} marginTop={6} marginX={40} padding={2}>
            {content && content.length > 0 && content.map(component => renderComponent(component))}
        </Grid>
    );
};

export default Content;
