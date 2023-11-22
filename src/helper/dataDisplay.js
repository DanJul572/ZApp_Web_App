import CDateTimeFormat from '@/constant/CDateTimeFormat';
import CInputType from '@/constant/CInputType';
import dayjs from 'dayjs';

const dataDisplay = (type, value) => {
    // if (type === CInputType.checkbox.value)
    //     return value ? value.map(item => `(${item.value}) - ${item.label}`).join(' | ') : '';

    if (type === CInputType.code.value) return value ? 'Code' : '';

    if (type === CInputType.date.value) return value ? dayjs(value).format(CDateTimeFormat.date.display) : '';

    if (type === CInputType.file.value) return value ? 'File' : '';

    if (type === CInputType.richText.value) return value ? 'HTML' : '';

    if (type === CInputType.time.value) return value ? dayjs(value).format(CDateTimeFormat.time.display) : '';

    // if (type === CInputType.dropdown.value || type === CInputType.radio.value)
    //     return value ? `(${value.value}) - ${value.label}` : '';

    if (type === CInputType.toggle.value) return value ? 'Yes' : 'No';

    if (type === CInputType.number.value) return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';

    return value;
};

export default dataDisplay;
