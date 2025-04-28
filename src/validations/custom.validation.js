const { VALID_MONGOOSE_ID_REGEX, VALID_EMAIL_REGEX, VALID_PASSWORD_REGEX, VALID_NAME_REGEX } = require('../constants/regex');

const objectId = (value, helpers) => {
  if (!value.match(VALID_MONGOOSE_ID_REGEX)) {
    return helpers.message('Id "{{#label}}" không đúng định dạng!');
  }

  return value;
};

const password = (value, helpers) => {
  if (!VALID_PASSWORD_REGEX.test(value)) {
    return helpers.message('Password must be have at least 6 characters long, 1 lowercase character & 1 number!');
  }

  return value;
};

const name = (value, helpers) => {
  if (!value.match(VALID_NAME_REGEX)) {
    return helpers.message('Invalid name!');
  }
  return value;
};

const email = (value, helpers) => {
  if (!value.match(VALID_EMAIL_REGEX)) {
    return helpers.message('Invalid email!');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  name,
  email,
};
