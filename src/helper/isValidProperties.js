import CButtonType from '@/constant/CButtonType';
import CChartType from '@/constant/CChartType';
import CComponentGroupType from '@/constant/CComponentGroupType';
import CContainerType from '@/constant/CContainerType';
import CInputType from '@/constant/CInputType';
import CVisualElement from '@/constant/CVisualElementType';

const isBorderValid = (type, group) =>
    type === CContainerType.card.value && group === CComponentGroupType.container.value;

const isPaddingValid = (type, group) =>
    type === CContainerType.card.value && group === CComponentGroupType.container.value;

const isModuleIDValid = group => group === CComponentGroupType.table.value;

const isNameValid = group => group === CComponentGroupType.fieldControl.value;

const isSizeValid = (type, group) =>
    (type === CContainerType.grid.value && group === CComponentGroupType.container.value) ||
    (type === CContainerType.drawer.value && group === CComponentGroupType.container.value) ||
    (type === CVisualElement.text.value && group === CComponentGroupType.visualElement.value);

const isViewIDValid = (type, group) =>
    group === CComponentGroupType.container.value && type === CContainerType.view.value;

const isFieldIDValid = (type, group) =>
    group === CComponentGroupType.fieldControl.value && type === CInputType.dropdown.value;

const isLabelValid = (type, group) =>
    (group === CComponentGroupType.container.value && type === CContainerType.collapse.value) ||
    (group === CComponentGroupType.container.value && type === CContainerType.tab.value) ||
    (group === CComponentGroupType.chart.value && type !== CChartType.pie.value) ||
    (group === CComponentGroupType.visualElement.value && type === CVisualElement.text.value) ||
    group === CComponentGroupType.fieldControl.value ||
    group === CComponentGroupType.button.value;

const isValueValid = group => group === CComponentGroupType.chart.value;

const isOnClickValid = group => group === CComponentGroupType.button.value;

const isDisableValid = (type, group) =>
    (group === CComponentGroupType.button.value && type === CButtonType.button.value) ||
    group === CComponentGroupType.fieldControl.value;

const isOpenValid = (type, group) =>
    group === CComponentGroupType.container.value && type === CContainerType.drawer.value;

const isHiddenValid = group =>
    group === CComponentGroupType.button.value || group === CComponentGroupType.fieldControl.value;

const isLoopValid = (type, group) =>
    group === CComponentGroupType.visualElement.value && type === CVisualElement.text.value;

const isValidProperties = (property, type, group) => {
    switch (property) {
        case 'border':
            return isBorderValid(type, group);
        case 'padding':
            return isPaddingValid(type, group);
        case 'moduleID':
            return isModuleIDValid(group);
        case 'name':
            return isNameValid(group);
        case 'size':
            return isSizeValid(type, group);
        case 'viewID':
            return isViewIDValid(type, group);
        case 'fieldID':
            return isFieldIDValid(type, group);
        case 'label':
            return isLabelValid(type, group);
        case 'value':
            return isValueValid(group);
        case 'onClick':
            return isOnClickValid(group);
        case 'disable':
            return isDisableValid(type, group);
        case 'open':
            return isOpenValid(type, group);
        case 'hidden':
            return isHiddenValid(group);
        case 'loop':
            return isLoopValid(type, group);
        default:
            return false;
    }
};

export default isValidProperties;
