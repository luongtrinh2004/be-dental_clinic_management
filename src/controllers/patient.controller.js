const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const patientService = require('../services/patient.service');

const Patient = require('../models/patient.model');
const MedicalRecord = require('../models/medicalRecord.model');

const createPatient = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);

    // ➕ Tạo lịch sử khám khi tạo bệnh nhân mới
    await MedicalRecord.create({
      patientId: newPatient._id,
      appointmentDate: newPatient.appointmentDate || new Date(),
      nextAppointmentDate: newPatient.nextAppointmentDate || null,
      medicalHistory: newPatient.medicalHistory || '',
      note: newPatient.note || '',
      cost: newPatient.cost || 0,
      status: newPatient.status,
    });

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo bệnh nhân', error: error.message });
  }
};

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
