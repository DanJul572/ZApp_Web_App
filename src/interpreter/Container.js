import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Collapse from '@/component/container/Collapse';

import CContainerType from '@/constant/CContainerType';

import Runner from '@/runner';

const Container = props => {
    const {type, section, properties, renderComponent} = props;

    const {getValues} = Runner();

    const color = properties.color ? properties.color.value : null;
    const label = getValues(properties.label, 'js');

    const content = () => {
        if (type === CContainerType.card.value) {
            return (
                <Box border={1} borderColor={grey[300]} borderRadius={1} padding={1}>
                    <Typography fontSize={10}>Card</Typography>
                    <Box>{section && section.length > 0 && section.map(childs => childs.map(renderComponent))}</Box>
                </Box>
            );
        } else if (type === CContainerType.grid.value) {
            let columnSize = properties.size ? properties.size.split(',') : [];
            let defaultSize = 12 / (section.length > 0 ? section.length : 1);
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography fontSize={10}>Grid</Typography>
                    </Grid>
                    {section &&
                        section.map((childs, index) => (
                            <Grid item xs={columnSize.length > 0 ? parseInt(columnSize[index]) : defaultSize} key={index}>
                                {childs.map(renderComponent)}
                            </Grid>
                        ))}
                </Grid>
            );
        } else if (type === CContainerType.collapse.value) {
            return (
                <Collapse label={label || CContainerType.collapse.label} color={color}>
                    {section && section.length > 0 && section.map(childs => childs.map(renderComponent))}
                </Collapse>
            );
        }
    };

    return content();
};

export default Container;
