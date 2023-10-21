import {Box, IconButton, colors, Grid} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Card} from '@/component/container';
import {LongText, Toggle, ShortText} from '@/component/input';
import {componentGroupType, containerType, inputType} from '@/constant';

const Content = props => {
    const {content, selected, setSelected} = props;

    const Container = ({children, component}) => {
        return (
            <Box
                key={component.id}
                border={selected && component.id === selected.id ? 1 : 0}
                borderColor={colors.blue[300]}
                padding={1}>
                {children}
                <IconButton
                    onClick={() => setSelected(component)}
                    size="small"
                    style={{padding: 0}}>
                    <MoreHorizIcon fontSize="10" />
                </IconButton>
            </Box>
        );
    };

    const renderComponent = component => {
        let id = component.id;
        let group = component.group.value;
        let type = component.type.value;
        let section = component.section;
        // let properties = component.properites;

        if (group === componentGroupType.container.value) {
            if (type === containerType.card.value) {
                return (
                    <Container key={id} component={component}>
                        <Card>
                            {section &&
                                section.length > 0 &&
                                section.map(childs => childs.map(child => renderComponent(child)))}
                        </Card>
                    </Container>
                );
            }
        } else if (group === componentGroupType.fieldControl.value) {
            if (type === inputType.shortText.value) {
                return (
                    <Container key={id} component={component}>
                        <ShortText disabled={true} />
                    </Container>
                );
            } else if (type === inputType.longText.value) {
                return (
                    <Container key={id} component={component}>
                        <LongText disabled={true} />
                    </Container>
                );
            } else if (type === inputType.toggle.value) {
                return (
                    <Container key={id} component={component}>
                        <Toggle disabled={true} />
                    </Container>
                );
            }
        }
    };

    return (
        <Grid item xs={8} border={1} borderColor={colors.grey[400]} padding={2}>
            {content.length > 0 && content.map(component => renderComponent(component))}
        </Grid>
    );
};

export default Content;
