import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Collapse from '@/component/container/Collapse';

import CContainerType from '@/constant/CContainerType';

import {useBuilder} from '@/context/BuilderProvider';

const Container = props => {
    const {type, section, properties, renderComponent} = props;

    // eslint-disable-next-line no-unused-vars
    const {vars, setVars} = useBuilder();

    const content = () => {
        if (type === CContainerType.card.value) {
            return (
                <Box
                    border={section.length ? 1 : 0}
                    borderColor={grey[300]}
                    borderRadius={1}
                    padding={section.length ? 1 : 0}>
                    <Typography fontSize={10} fontWeight="bold">
                        Card
                    </Typography>
                    <Box>
                        {section && section.length > 0 && section.map(childs => childs.map(child => renderComponent(child)))}
                    </Box>
                </Box>
            );
        } else if (type === CContainerType.grid.value) {
            let columnSize = properties.size ? properties.size.split(',') : [];
            let defaultSize = 12 / (section.length > 0 ? section.length : 1);
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography fontSize={10} fontWeight="bold">
                            Grid
                        </Typography>
                    </Grid>
                    {section &&
                        section.map((childs, index) => (
                            <Grid item xs={columnSize.length > 0 ? parseInt(columnSize[index]) : defaultSize} key={index}>
                                {childs.map(child => renderComponent(child))}
                            </Grid>
                        ))}
                </Grid>
            );
        } else if (type === CContainerType.collaps.value) {
            return (
                <Collapse label={properties.label ? eval(properties.label) : CContainerType.collaps.label}>
                    {section && section.length > 0 && section.map(childs => childs.map(child => renderComponent(child)))}
                </Collapse>
            );
        }
    };

    return content();
};

export default Container;
