const Patient = require('../models/patient.model');

const createPatient = async (patientData) => {
  return await Patient.create(patientData);
};

const getPatients = async () => {
  return await Patient.find();
};

const getPatientById = async (id) => {
  return await Patient.findById(id);
};

const updatePatient = async (id, updateData) => {
  return await Patient.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePatient = async (id) => {
  return await Patient.findByIdAndDelete(id);
};

module.exports = { createPatient, getPatients, getPatientById, updatePatient, deletePatient };
