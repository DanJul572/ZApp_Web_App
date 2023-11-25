import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Collapse from '@/component/container/Collapse';

import CContainerType from '@/constant/CContainerType';

const Container = props => {
    const {type, section, properties, renderComponent, parse} = props;

    const content = () => {
        if (type === CContainerType.card.value) {
            return (
                <Box
                    border={section.length ? 1 : 0}
                    borderColor={grey[300]}
                    borderRadius={1}
                    padding={section.length ? 1 : 0}>
                    <Typography fontSize={10}>Card</Typography>
                    <Box sx={parse.styles}>
                        {section && section.length > 0 && section.map(childs => childs.map(renderComponent))}
                    </Box>
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
                            <Grid
                                item
                                xs={columnSize.length > 0 ? parseInt(columnSize[index]) : defaultSize}
                                key={index}
                                sx={parse.styles}>
                                {childs.map(renderComponent)}
                            </Grid>
                        ))}
                </Grid>
            );
        } else if (type === CContainerType.collaps.value) {
            return (
                <Collapse label={parse.label || CContainerType.collaps.label} sx={parse.styles}>
                    {section && section.length > 0 && section.map(childs => childs.map(renderComponent))}
                </Collapse>
            );
        }
    };

    return content();
};

export default Container;
