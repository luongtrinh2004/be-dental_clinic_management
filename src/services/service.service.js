const Service = require('../models/service.model');

const getAll = () => Service.find();

const getById = (id) => Service.findById(id);

const create = (data) => Service.create(data);

const update = (id, data) => Service.findByIdAndUpdate(id, data, { new: true });

const remove = (id) => Service.findByIdAndDelete(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
