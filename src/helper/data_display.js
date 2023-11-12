import INPUT_TYPE from '@/constant/INPUT_TYPE';
import dayjs from 'dayjs';

const dataDisplay = (type, value) => {
    if (type === INPUT_TYPE.checkbox.value)
        return value ? value.map(item => `(${item.value}) - ${item.label}`).join(' | ') : '';

    if (type === INPUT_TYPE.date.value) return value ? dayjs(value).format('DD/MM/YYYY') : '';

    if (type === INPUT_TYPE.file.value) return value ? 'File' : '';

    if (type === INPUT_TYPE.richText.value) return value ? 'HTML' : '';

    if (type === INPUT_TYPE.time.value) return value ? dayjs(value).format('H:m:s') : '';

    if (type === INPUT_TYPE.dropdown.value || type === INPUT_TYPE.radio.value)
        return value ? `(${value.value}) - ${value.label}` : '';

    if (type === INPUT_TYPE.toggle.value) return value ? 'Yes' : 'No';

    if (type === INPUT_TYPE.number.value) return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';

    return value;
};

export default dataDisplay;
