import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Card from '@/component/container/Card';
import Collapse from '@/component/container/Collapse';
import Drawer from '@/component/container/Drawer';
import Tab from '@/component/container/Tab';

import CContainerType from '@/constant/CContainerType';

import Content from '@/hooks/Content';
import Page from './Page';
import Runner from '@/runner';

const Container = props => {
    const {type, section, properties, renderComponent, isBuilder} = props;

    const {getValues} = Runner();

    const anchor = properties.anchor;
    const border = parseInt(properties.border);
    const color = properties.color ? properties.color.value : null;
    const display = properties.display;
    const flex = Boolean(properties.flex);
    const label = getValues(properties.label, 'js');
    const open = getValues(properties.open, 'js');
    const padding = parseInt(properties.padding);
    const size = properties.size;
    const viewID = getValues(properties.viewID, 'js');

    const contentProps = {
        params: {
            id: viewID,
        },
        isBuilder: isBuilder,
    };

    const {content, page} = Content(contentProps);

    const render = () => {
        if (type === CContainerType.card.value) {
            return (
                <Card color={color} flex={flex} display={display} border={border} padding={padding}>
                    {section && section.length > 0 && section.map(childs => childs.map(renderComponent))}
                </Card>
            );
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
                    <Drawer anchor={anchor} open={Boolean(open)} size={size}>
                        {section && section.length > 0 && section.map(childs => childs.map(renderComponent))}
                    </Drawer>
                );
            }
        } else if (type === CContainerType.tab.value) {
            const contents = section.map(childs => childs.map(renderComponent));
            return <Tab contents={contents} label={label} section={section} />;
        } else if (type === CContainerType.view.value) {
            if (isBuilder) {
                return (
                    <Typography fontSize="10" textAlign="center">
                        VIEW PAGE CANNOT SHOW IN BUILDER MODE
                    </Typography>
                );
            } else {
                return (
                    <Page isBuilder={isBuilder} page={page}>
                        {content && content.length > 0 && Array.isArray(content)
                            ? content.map(renderComponent)
                            : content}
                    </Page>
                );
            }
        }
    };

    return render();
};

export default Container;
