const Joi = require('joi');

const serviceTypeSchema = Joi.object({
  type: Joi.string().allow(null, '').optional(),
  price: Joi.string().required().messages({
    'any.required': 'Thiếu giá dịch vụ.',
    'string.base': 'Giá dịch vụ phải là chuỗi.',
  }),
  warranty: Joi.string().allow(null, '').optional(),
});

const groupedServiceSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Thiếu tên nhóm dịch vụ.',
  }),
  types: Joi.array().items(serviceTypeSchema).required(),
});

const createOrUpdateService = {
  body: Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'Thiếu tiêu đề dịch vụ.',
    }),
    services: Joi.array().items(groupedServiceSchema).required(),
  }),
};

const serviceIdParam = {
  params: Joi.object({
    serviceId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createOrUpdateService,
  serviceIdParam,
};
