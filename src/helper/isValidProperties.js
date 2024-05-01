import CButtonType from '@/constant/CButtonType';
import CChartType from '@/constant/CChartType';
import CComponentGroupType from '@/constant/CComponentGroupType';
import CContainerType from '@/constant/CContainerType';
import CInputType from '@/constant/CInputType';
import CVisualElement from '@/constant/CVisualElementType';

const isValidProperties = (property, type, group) => {
    if (property === 'border') {
        if (type === CContainerType.card.value && group === CComponentGroupType.container.value) return true;
    } else if (property === 'padding') {
        if (type === CContainerType.card.value && group === CComponentGroupType.container.value) return true;
    } else if (property === 'moduleID') {
        if (group === CComponentGroupType.table.value) return true;
    } else if (property === 'name') {
        if (group === CComponentGroupType.fieldControl.value) return true;
    } else if (property === 'size') {
        if (type === CContainerType.grid.value && group === CComponentGroupType.container.value) return true;
        else if (type === CContainerType.drawer.value && group === CComponentGroupType.container.value) return true;
        else if (type === CVisualElement.text.value && group === CComponentGroupType.visualElement.value) return true;
    } else if (property === 'viewID') {
        if (group === CComponentGroupType.container.value && type === CContainerType.view.value) return true;
    } else if (property === 'fieldID') {
        if (group === CComponentGroupType.fieldControl.value && type === CInputType.dropdown.value) return true;
    } else if (property === 'label') {
        if (group === CComponentGroupType.container.value && type === CContainerType.collapse.value) return true;
        else if (group === CComponentGroupType.container.value && type === CContainerType.tab.value) return true;
        else if (group === CComponentGroupType.chart.value && type !== CChartType.pie.value) return true;
        else if (group === CComponentGroupType.visualElement.value && type === CVisualElement.text.value) return true;
        else if (group === CComponentGroupType.fieldControl.value) return true;
        else if (group === CComponentGroupType.button.value) return true;
    } else if (property === 'value') {
        if (group === CComponentGroupType.chart.value) return true;
    } else if (property === 'onClick') {
        if (group === CComponentGroupType.button.value) return true;
    } else if (property === 'disable') {
        if (group === CComponentGroupType.button.value && type === CButtonType.button.value) return true;
        else if (group === CComponentGroupType.fieldControl.value) return true;
    } else if (property === 'open') {
        if (group === CComponentGroupType.container.value && type === CContainerType.drawer.value) return true;
    } else if (property === 'hidden') {
        if (group === CComponentGroupType.button.value) return true;
        else if (group === CComponentGroupType.fieldControl.value) return true;
    } else {
        return false;
    }
};

export default isValidProperties;
