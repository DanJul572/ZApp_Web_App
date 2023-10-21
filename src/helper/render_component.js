import {Card} from '@/component/container';
import {LongText, Toggle, ShortText} from '@/component/input';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {componentGroupType, containerType, inputType} from '@/constant';
import {Box, IconButton} from '@mui/material';

const Container = ({children, id}) => {
    return (
        <Box key={id}>
            {children}
            <IconButton onClick={() => console.log(id)} size="small" style={{padding: 0}}>
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
                <Container key={id} id={id}>
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
                <Container key={id} id={id}>
                    <ShortText disabled={true} />
                </Container>
            );
        } else if (type === inputType.longText.value) {
            return (
                <Container key={id} id={id}>
                    <LongText disabled={true} />
                </Container>
            );
        } else if (type === inputType.toggle.value) {
            return (
                <Container key={id} id={id}>
                    <Toggle disabled={true} />
                </Container>
            );
        }
    }
};

export default renderComponent;
