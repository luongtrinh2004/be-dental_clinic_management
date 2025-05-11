const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMedicalHistory = {
  body: Joi.object({
    patientId: objectId().required(),
    medicalService: Joi.string().min(3).max(255).required().messages({
      'string.base': 'Dịch vụ khám phải là chuỗi.',
      'string.min': 'Dịch vụ khám tối thiểu {#limit} ký tự.',
      'string.max': 'Dịch vụ khám tối đa {#limit} ký tự.',
      'any.required': 'Thiếu trường dịch vụ khám.',
    }),
    note: Joi.string().allow('', null),
    cost: Joi.number().min(0).messages({
      'number.base': 'Chi phí phải là số.',
      'number.min': 'Chi phí không được âm.',
    }),
    appointmentDate: Joi.date().iso().required().messages({
      'date.base': 'Ngày khám không hợp lệ.',
      'date.format': 'Ngày khám phải có định dạng ISO.',
      'any.required': 'Thiếu trường ngày khám.',
    }),
    nextAppointmentDates: Joi.array().items(Joi.date().iso()).messages({
      'array.base': 'Danh sách ngày hẹn tiếp theo phải là mảng.',
      'date.base': 'Ngày hẹn phải có định dạng ISO.',
    }),
  }),
};

const updateMedicalHistory = {
  params: Joi.object({
    id: objectId().required(),
  }),
  body: Joi.object({
    medicalService: Joi.string().min(3).max(255),
    note: Joi.string().allow('', null),
    cost: Joi.number().min(0),
    appointmentDate: Joi.date().iso(),
    nextAppointmentDates: Joi.array().items(Joi.date().iso()),
  }),
};

const getOrDelete = {
  params: Joi.object({
    id: objectId().required(),
  }),
};

const getByPatient = {
  params: Joi.object({
    patientId: objectId().required(),
  }),
};

module.exports = {
  createMedicalHistory,
  updateMedicalHistory,
  getOrDelete,
  getByPatient,
};
