const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.maritalStatus = !isEmpty(data.maritalStatus) ? data.maritalStatus : '';
  data.hobbies = !isEmpty(data.hobbies) ? data.hobbies : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.profession = !isEmpty(data.profession) ? data.profession : '';
  data.age = !isEmpty(data.age) ? data.age : -1;
  data.sex = !isEmpty(data.sex) ? data.sex : '';
  data.motivation = !isEmpty(data.motivation) ? data.motivation : '';
  data.personality = !isEmpty(data.personality) ? data.personality : '';

  let emptyProperties = [];
  for (let property in data) {
    if (data[property] === '') {
      emptyProperties.push(property);
    }
  }

  // Check if use send more information than only name
  if (data.name !== '' && emptyProperties.length < Object.keys(data).length - 1) {

  }
  else {
    errors.moreInfo = "Send more information about your partner!";
  }
  console.log(emptyProperties);

  return {
    errors,
    isValid: isEmpty(errors)
  }
}