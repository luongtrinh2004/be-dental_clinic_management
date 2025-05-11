const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Service = require('../models/service.model');

const getAll = async () => {
  return Service.find(); // lấy toàn bộ, không lọc status
};

const getById = async (id) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dịch vụ không tồn tại');
  }
  return service;
};

const create = async (data) => {
  // OPTIONAL: Kiểm tra trùng tiêu đề (bật nếu cần)
  // const exists = await Service.findOne({ title: data.title });
  // if (exists) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Tiêu đề dịch vụ đã tồn tại');
  // }

  return Service.create(data);
};

const update = async (id, data) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy dịch vụ để cập nhật');
  }

  Object.assign(service, data);
  await service.save();
  return service;
};

const remove = async (id) => {
  await Service.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
