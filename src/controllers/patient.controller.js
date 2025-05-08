const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const patientService = require('../services/patient.service');

const Patient = require('../models/patient.model');

// ✔️ Tạo bệnh nhân (không cho phép truyền email và status)
const createPatient = async (req, res) => {
  try {
    // Chỉ lấy các trường được phép
    const { name, gender, dateOfBirth, phone, address } = req.body;

    const newPatient = await Patient.create({
      name,
      gender,
      dateOfBirth,
      phone,
      address,
    });

    res.status(httpStatus.CREATED).json(newPatient);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo bệnh nhân',
      error: error.message,
    });
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
  // Giới hạn các trường cho phép cập nhật
  const allowedFields = ['name', 'gender', 'dateOfBirth', 'phone', 'address'];
  const updateData = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  const patient = await patientService.updatePatient(req.params.id, updateData);
  res.status(httpStatus.OK).json(patient);
});

const deletePatient = catchAsync(async (req, res) => {
  await patientService.deletePatient(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
