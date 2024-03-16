import Grid from '@mui/material/Grid';

import Card from '@/component/container/Card';
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
            return <Card>{section && section.length > 0 && section.map(childs => childs.map(renderComponent))}</Card>;
        } else if (type === CContainerType.grid.value) {
            let columnSize = properties.size ? properties.size.split(',') : [];
            let defaultSize = 12 / (section.length > 0 ? section.length : 1);
            return (
                <Grid container>
                    {section &&
                        section.map((childs, index) => (
                            <Grid
                                item
                                xs={columnSize.length > 0 ? parseInt(columnSize[index]) : defaultSize}
                                key={index}>
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
