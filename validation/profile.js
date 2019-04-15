const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.hobbies = !isEmpty(data.hobbies) ? data.hobbies : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.profession = !isEmpty(data.profession) ? data.profession : '';
  data.age = !isEmpty(data.age) ? data.age : -1;
  data.sex = !isEmpty(data.sex) ? data.sex : '';
  data.motivation = !isEmpty(data.motivation) ? data.motivation : '';
  data.personality = !isEmpty(data.personality) ? data.personality : '';


  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Bio field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}