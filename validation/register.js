const validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmedPassword = !isEmpty(data.password) ? data.confirmedPassword : '';


    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Passoword field is required';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters'
    }

    if (validator.isEmpty(data.confirmedPassword)) {
        errors.confirmedPassword = 'Confirm password field is required';
    }

    if (!validator.equals(data.password, data.confirmedPassword)) {
        errors.confirmedPassword = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}