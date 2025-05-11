const Joi = require('joi');

const serviceTypeSchema = Joi.object({
  type: Joi.string().allow(null, '').optional(), // ❗ Không bắt buộc
  price: Joi.string().required().messages({
    'any.required': 'Thiếu giá dịch vụ.',
    'string.base': 'Giá dịch vụ phải là chuỗi.',
  }),
  warranty: Joi.string().allow(null, '').optional(), // ❗ Không bắt buộc
});

const groupedServiceSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Thiếu tên nhóm dịch vụ.',
  }),
  types: Joi.array().items(serviceTypeSchema).required(),
});

const createOrUpdateService = {
  body: Joi.object({
    title: Joi.string().allow(null, '').optional(), // ❗ Không bắt buộc
    services: Joi.array().items(groupedServiceSchema).required(),
  }),
};
