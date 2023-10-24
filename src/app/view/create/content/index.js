import {Box, IconButton, colors, Grid, Tooltip, Divider, Typography, Button} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {LongText, Toggle, ShortText, Dropdown, Number} from '@/component/input';
import {actionType, componentGroupType, containerType, dataDisplayType, inputType, visualElementType} from '@/constant';
import {Table} from '@/component';
import mockColumns from '@/mock/table/columns';
import mockRows from '@/mock/table/rows';
import buttonType from '@/constant/button_type';

const Content = props => {
    const {content, selected, setSelected} = props;
    const actions = [
        {
            type: actionType.insert.value,
        },
        {
            type: actionType.update.value,
        },
        {
            type: actionType.delete.value,
        },
        {
            type: actionType.detail.value,
        },
    ];

    const Container = ({children, component}) => {
        return (
            <Box
                key={component.id}
                border={selected && component.id === selected.id ? 1 : 0}
                borderColor={colors.blue[300]}
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

        if (group === componentGroupType.container.value) {
            if (type === containerType.card.value) {
                return (
                    <Container key={id} component={component}>
                        <Box border={1} borderColor={colors.grey[300]} borderRadius={1} padding={1}>
                            <Box>
                                {section &&
                                    section.length > 0 &&
                                    section.map(childs => childs.map(child => renderComponent(child)))}
                            </Box>
                        </Box>
                    </Container>
                );
            } else if (type === containerType.grid.value) {
                return (
                    <Container key={id} component={component} padding={1}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography fontSize={10} fontWeight="bold">
                                    Grid
                                </Typography>
                            </Grid>
                            {section &&
                                section.map((childs, index) => (
                                    <Grid item xs={12 / section.length} key={index}>
                                        {childs.map(child => renderComponent(child))}
                                    </Grid>
                                ))}
                        </Grid>
                    </Container>
                );
            }
        } else if (group === componentGroupType.fieldControl.value) {
            if (type === inputType.shortText.value) {
                return (
                    <Container key={id} component={component}>
                        <ShortText disabled={true} label={properties.label || inputType.shortText.label} />
                    </Container>
                );
            } else if (type === inputType.longText.value) {
                return (
                    <Container key={id} component={component}>
                        <LongText disabled={true} label={properties.label || inputType.longText.label} />
                    </Container>
                );
            } else if (type === inputType.number.value) {
                return (
                    <Container key={id} component={component}>
                        <Number disabled={true} label={properties.label || inputType.number.label} />
                    </Container>
                );
            } else if (type === inputType.toggle.value) {
                return (
                    <Container key={id} component={component}>
                        <Toggle disabled={true} label={properties.label || inputType.toggle.label} />
                    </Container>
                );
            } else if (type === inputType.dropdown.value) {
                return (
                    <Container key={id} component={component}>
                        <Dropdown options={[]} disabled={true} label={properties.label || inputType.dropdown.label} />
                    </Container>
                );
            }
        } else if (group === componentGroupType.visualElement.value) {
            if (type === visualElementType.divider.value) {
                return (
                    <Container key={id} component={component}>
                        <Divider />
                    </Container>
                );
            } else if (type === visualElementType.text.value) {
                return (
                    <Container key={id} component={component}>
                        <Typography fontSize={12}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </Typography>
                    </Container>
                );
            }
        } else if (group === componentGroupType.dataDisplay.value) {
            if (type === dataDisplayType.table.value) {
                return (
                    <Container key={id} component={component}>
                        <Table
                            action={actions}
                            columnKey={'id'}
                            columns={mockColumns}
                            enableExport={true}
                            enableHiding={true}
                            enablePagination={true}
                            enableRowSelection={true}
                            enableSearch={true}
                            enableSorting={true}
                            onChangePage={() => {}}
                            onClickRowAction={() => {}}
                            // onClickToolbarAction={onCLickToolbarAction}
                            onDelete={() => {}}
                            onSearch={() => {}}
                            onSelect={() => {}}
                            onSort={() => {}}
                            pageCount={1}
                            pageIndex={1}
                            rowCount={1}
                            rows={mockRows}
                        />
                    </Container>
                );
            }
        } else if (group === componentGroupType.button.value) {
            if (type === buttonType.button.value) {
                return (
                    <Container key={id} component={component}>
                        <Button size="small" variant="contained" disabled={true} style={{display: 'block'}}>
                            Button
                        </Button>
                    </Container>
                );
            }
        }
    };

    return (
        <Grid item xs={8} border={1} borderColor={colors.grey[400]} padding={2}>
            {content && content.length > 0 && content.map(component => renderComponent(component))}
        </Grid>
    );
};

export default Content;
