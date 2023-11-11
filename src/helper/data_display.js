import DATA_TYPE from '@/constant/DATA_TYPE';

const dataDisplay = (type, value) => {
    if (type === DATA_TYPE.tableReference.value) return value ? `(${value.value}) - ${value.label}` : '';

    if (type === DATA_TYPE.boolean.value) return value ? 'Yes' : 'No';

    if (type === DATA_TYPE.integer.value || type === DATA_TYPE.autoIncrement.value)
        return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';

    return value;
};

export default dataDisplay;
