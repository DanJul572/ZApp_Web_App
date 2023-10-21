import {Card} from '@/component/container';
import {LongText, Toggle, ShortText} from '@/component/input';
import {componentGroupType, containerType, inputType} from '@/constant';

const renderComponent = component => {
    // let id = component.id;
    let group = component.group.value;
    let type = component.type.value;
    let section = component.section;
    // let properties = component.properites;

    if (group === componentGroupType.container.value) {
        if (type === containerType.card.value) {
            return (
                <Card>
                    {section &&
                        section.length > 0 &&
                        section.map(childs => childs.map(child => renderComponent(child)))}
                </Card>
            );
        }
    } else if (group === componentGroupType.fieldControl.value) {
        if (type === inputType.shortText.value) {
            return <ShortText onChange={() => {}} />;
        } else if (type === inputType.longText.value) {
            return <LongText onChange={() => {}} />;
        } else if (type === inputType.toggle.value) {
            return <Toggle onChange={() => {}} />;
        }
    }
};

export default renderComponent;
