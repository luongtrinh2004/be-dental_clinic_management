const serviceService = require('../services/service.service');

exports.getAll = async (req, res) => {
  const services = await serviceService.getAll();
  res.json(services);
};

exports.getById = async (req, res) => {
  const service = await serviceService.getById(req.params.id);
  res.json(service);
};

exports.create = async (req, res) => {
  const newService = await serviceService.create(req.body);
  res.status(201).json(newService);
};

exports.update = async (req, res) => {
  const updated = await serviceService.update(req.params.id, req.body);
  res.json(updated);
};

exports.remove = async (req, res) => {
  await serviceService.remove(req.params.id);
  res.status(204).end();
};
