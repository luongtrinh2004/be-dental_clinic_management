const httpStatus = require('http-status');
const { Patient } = require('../models');
const ApiError = require('../utils/ApiError');

const createPatient = async (body) => {
  const { phone } = body;

  // Check if phone number already exists
  if (await Patient.isPhoneExist(phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Số điện thoại đã tồn tại');
  }

  const newPatient = await Patient.create(body);
  return newPatient;
};

const queryPatients = async (filter, options) => {
  const patients = await Patient.paginate(filter, options);
  return patients;
};

const getPatientById = async (id) => {
  const patient = await Patient.findById(id);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bệnh nhân không tồn tại');
  }
  return patient;
};

const updatePatient = async (id, updateData) => {
  const patient = await getPatientById(id);
  // TODO: Check if phone number already exists

  const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, { new: true });
  return updatedPatient;
};

const deletePatient = async (id) => {
  // TODO: Code here to set status to inactive instead of deleting
  return await Patient.findByIdAndDelete(id);
};

module.exports = { createPatient, queryPatients, getPatientById, updatePatient, deletePatient };
