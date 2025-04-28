const Joi = require('joi');
const { password } = require('./custom.validation');

const updatePassword = {
  body: Joi.object().keys({
    currentPassword: Joi.string().required().custom(password),
    newPassword: Joi.string().required().custom(password),
  }),
};

const updateAccount = {
  body: Joi.object().keys({
    name: Joi.string(),
  }),
};

module.exports = {
  updatePassword,
  updateAccount,
};
