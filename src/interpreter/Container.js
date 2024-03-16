import Grid from '@mui/material/Grid';

import Card from '@/component/container/Card';
import Collapse from '@/component/container/Collapse';
import Drawer from '@/component/container/Drawer';

import CContainerType from '@/constant/CContainerType';

import Comp from '@/hooks/Comp';

import Runner from '@/runner';

const Container = props => {
    const {type, section, properties, renderComponent, isBuilder} = props;

    const {getValues} = Runner();
    const {get, set} = Comp();

    const color = properties.color ? properties.color.value : null;
    const label = getValues(properties.label, 'js');
    const open = get(properties.name);

    const closeDrawer = param => {
        set(properties.name, param);
    };

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
        } else if (type === CContainerType.drawer.value) {
            if (isBuilder) {
                return (
                    <Card>{section && section.length > 0 && section.map(childs => childs.map(renderComponent))}</Card>
                );
            } else {
                return (
                    <Drawer open={Boolean(open)} setOpen={closeDrawer}>
                        {section && section.length > 0 && section.map(childs => childs.map(renderComponent))}
                    </Drawer>
                );
            }
        }
    };

    return content();
};

export default Container;
