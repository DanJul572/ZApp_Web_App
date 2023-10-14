const Validator = (rules, value) => {
    if (!rules) return false;

    rules = rules.split('|');
    let error = {
        status: false,
        message: '',
    };

    const required = () => {
        return !value ? true : false;
    };

    const specialCharacter = () => {
        return value.match(/[^a-zA-Z0-9]+/) ? true : false;
    };

    const startNumeric = () => {
        return value.match(/^[0-9]/) ? true : false;
    };

    for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];

        if (rule === 'required' && required()) {
            error.status = true;
            error.message = 'Can not be empty';
            break;
        }

        if (rule === 'special_character' && specialCharacter()) {
            error.status = true;
            error.message = 'Must not contain special characters';
            break;
        }

        if (rule === 'start_numeric' && startNumeric()) {
            error.status = true;
            error.message = 'Must not start with a number';
            break;
        }
    }

    return error;
};

export default Validator;
