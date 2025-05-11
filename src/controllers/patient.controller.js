/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { patientService } = require('../services');
const pick = require('../utils/pick');

const createPatient = catchAsync(async (req, res) => {
  const result = await patientService.createPatient(req.body);
  res.send(result);
});

const queryPatients = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['searchTerm']);
  const options = {
    ...pick(req.query, ['sortBy', 'limit', 'page']),
    searchFields: ['patientCode', 'name', 'phone'],
  };

  const result = await patientService.queryPatients(filter, options);
  res.send(result);
});

const getPatientById = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientById(req.params.patientId);
  res.send(patient);
});

const updatePatient = catchAsync(async (req, res) => {
  const result = await patientService.updatePatient(req.params.patientId, req.body);
  res.send(result);
});

const deletePatient = catchAsync(async (req, res) => {
  const result = await patientService.deletePatient(req.params.patientId);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createPatient,
  queryPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
