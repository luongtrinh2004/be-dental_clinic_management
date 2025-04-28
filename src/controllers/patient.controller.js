const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const patientService = require('../services/patient.service');

const createPatient = catchAsync(async (req, res) => {
  const patient = await patientService.createPatient(req.body);
  res.status(httpStatus.CREATED).json(patient);
});

const getPatients = catchAsync(async (req, res) => {
  const patients = await patientService.getPatients();
  res.status(httpStatus.OK).json(patients);
});

const getPatientById = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientById(req.params.id);
  res.status(httpStatus.OK).json(patient);
});

const updatePatient = catchAsync(async (req, res) => {
  const patient = await patientService.updatePatient(req.params.id, req.body);
  res.status(httpStatus.OK).json(patient);
});

const deletePatient = catchAsync(async (req, res) => {
  await patientService.deletePatient(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { createPatient, getPatients, getPatientById, updatePatient, deletePatient };
