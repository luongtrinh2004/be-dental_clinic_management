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
  const finalFilter = { ...filter };

  if (!finalFilter.status) {
    finalFilter.status = 'active';
  }

  return Patient.paginate(finalFilter, options);
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
  if (updateData.phone && (await Patient.isPhoneExist(updateData.phone, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Số điện thoại đã tồn tại');
  }

  const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, { new: true });
  return updatedPatient;
};

const deletePatient = async (id) => {
  const patient = await getPatientById(id); // kiểm tra tồn tại

  if (patient.status === 'inactive') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bệnh nhân đã bị vô hiệu hóa.');
  }

  patient.status = 'inactive';
  await patient.save();

  return patient;
};

module.exports = { createPatient, queryPatients, getPatientById, updatePatient, deletePatient };
