import CComponentGroupType from '@/constant/CComponentGroupType';

import Button from './Button';
import Chart from './Chart';
import Container from './Container';
import FieldControl from './FieldControl';
import Table from './Table';
import VisualElement from './VisualElement';
import Wraper from './Wrapper';

import Page from './shared/Page';

const Interpreter = props => {
    const {isPreview, isBuilder, content, page, selected, setSelected} = props;

    const renderComponent = component => {
        const group = component.group.value;
        const type = component.type.value;
        const section = component.section;
        const properties = component.properties;

        const wrapperProps = {
            component,
            isBuilder,
            selected,
            setSelected,
        };

        if (group === CComponentGroupType.container.value) {
            return (
                <Wraper {...wrapperProps}>
                    <Container
                        isBuilder={isBuilder}
                        properties={properties}
                        renderComponent={renderComponent}
                        section={section}
                        type={type}
                    />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.fieldControl.value) {
            return (
                <Wraper {...wrapperProps}>
                    <FieldControl type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.visualElement.value) {
            return (
                <Wraper {...wrapperProps}>
                    <VisualElement type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.table.value) {
            return (
                <Wraper {...wrapperProps}>
                    <Table type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.chart.value) {
            return (
                <Wraper {...wrapperProps}>
                    <Chart type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }

        if (group === CComponentGroupType.button.value) {
            return (
                <Wraper {...wrapperProps}>
                    <Button type={type} properties={properties} isBuilder={isBuilder} />
                </Wraper>
            );
        }
    };

    return (
        <Page isBuilder={isBuilder} page={page} isPreview={isPreview}>
            {content && content.length > 0 && Array.isArray(content) ? content.map(renderComponent) : content}
        </Page>
    );
};

export default Interpreter;
