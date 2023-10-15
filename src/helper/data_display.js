const tableReference = value => (value ? `(${value.value}) - ${value.label}` : '');
const boolean = value => (value ? 'Yes' : 'No');
const numeric = value => (value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '');

export {tableReference, boolean, numeric};
