const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid('admin', 'user'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    searchTerm: Joi.string(),
    role: Joi.string().valid('admin', 'user'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string().valid('active', 'inactive'),
    isEmailVerified: Joi.boolean(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      status: Joi.string().valid('active', 'inactive'),
    })
    .min(1),
};

const updatePassword = {
  body: Joi.object().keys({
    currentPassword: Joi.string().required().custom(password),
    newPassword: Joi.string().required().custom(password),
  }),
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  updatePassword,
};
