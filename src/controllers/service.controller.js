const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { serviceService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const services = await serviceService.getAll();
  res.send(services);
});

const getById = catchAsync(async (req, res) => {
  const service = await serviceService.getById(req.params.serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy dịch vụ');
  }
  res.send(service);
});

const create = catchAsync(async (req, res) => {
  const newService = await serviceService.create(req.body);
  res.status(httpStatus.CREATED).send(newService);
});

const update = catchAsync(async (req, res) => {
  const updated = await serviceService.update(req.params.serviceId, req.body);
  if (!updated) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy dịch vụ để cập nhật');
  }
  res.send(updated);
});

const remove = catchAsync(async (req, res) => {
  await serviceService.remove(req.params.serviceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
