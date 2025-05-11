const Joi = require('joi');
const { objectId } = require('./custom.validation');

// @route POST /v1/patients
const createPatient = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
      'string.base': 'Tên phải là chuỗi ký tự.',
      'string.empty': 'Tên không được để trống.',
      'string.min': 'Tên phải có ít nhất {#limit} ký tự.',
      'string.max': 'Tên tối đa {#limit} ký tự.',
      'any.required': 'Thiếu trường tên.',
    }),

    gender: Joi.number().valid(0, 1, 2).required().messages({
      'number.base': 'Giới tính phải là số.',
      'any.only': 'Giới tính phải là 0 (nam), 1 (nữ) hoặc 2 (khác).',
      'any.required': 'Thiếu trường giới tính.',
    }),

    dateOfBirth: Joi.date().iso().less('now').required().messages({
      'date.base': 'Ngày sinh không hợp lệ.',
      'date.format': 'Ngày sinh phải có định dạng ISO (YYYY-MM-DD).',
      'date.less': 'Ngày sinh phải trước ngày hiện tại.',
      'any.required': 'Thiếu trường ngày sinh.',
    }),

    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        'string.base': 'Số điện thoại phải là chuỗi.',
        'string.empty': 'Số điện thoại không được để trống.',
        'string.length': 'Số điện thoại phải đúng {#limit} chữ số.',
        'string.pattern.base': 'Số điện thoại chỉ được gồm các chữ số 0–9.',
        'any.required': 'Thiếu trường số điện thoại.',
      }),

    address: Joi.string().trim().min(5).max(255).required().messages({
      'string.base': 'Địa chỉ phải là chuỗi ký tự.',
      'string.empty': 'Địa chỉ không được để trống.',
      'string.min': 'Địa chỉ phải có ít nhất {#limit} ký tự.',
      'string.max': 'Địa chỉ tối đa {#limit} ký tự.',
      'any.required': 'Thiếu trường địa chỉ.',
    }),
  }),
};

// @route GET /v1/patients
const queryPatients = {
  query: Joi.object().keys({
    searchTerm: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer().min(1),
    status: Joi.string().valid('active', 'inactive'),
  }),
};

// @route PATCH /v1/patients/:patientId
const updatePatient = {
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    gender: Joi.number().valid(0, 1, 2),
    dateOfBirth: Joi.date().iso().less('now'),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
    address: Joi.string().min(5).max(255),
  }).min(1),
};

// @route GET /v1/patients/:patientId
const getPatient = {
  params: Joi.object({
    patientId: Joi.string().custom(objectId),
  }),
};

// @route DELETE /v1/patients/:patientId
const deletePatient = {
  params: Joi.object({
    patientId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPatient,
  queryPatients,
  updatePatient,
  deletePatient,
  getPatient,
};
