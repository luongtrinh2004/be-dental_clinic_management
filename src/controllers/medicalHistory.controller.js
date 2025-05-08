const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const MedicalHistory = require('../models/medicalHistory.model');

// Tạo mới hồ sơ khám
const createMedicalHistory = catchAsync(async (req, res) => {
  const history = await MedicalHistory.create({
    ...req.body,
    nextAppointmentDates: req.body.nextAppointmentDates || [],
  });
  res.status(httpStatus.CREATED).json(history);
});

// Lấy tất cả hồ sơ khám
const getAllMedicalHistories = catchAsync(async (req, res) => {
  const histories = await MedicalHistory.find().populate('patientId');
  res.status(httpStatus.OK).json(histories);
});

// Lấy hồ sơ theo bệnh nhân (mới nhất đầu tiên)
const getHistoriesByPatientId = catchAsync(async (req, res) => {
  const histories = await MedicalHistory.find({ patientId: req.params.patientId }).sort({ appointmentDate: -1 });
  res.status(httpStatus.OK).json(histories);
});

// Cập nhật hồ sơ khám
const updateMedicalHistory = catchAsync(async (req, res) => {
  const updated = await MedicalHistory.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      nextAppointmentDates: req.body.nextAppointmentDates || [],
    },
    { new: true }
  );
  res.status(httpStatus.OK).json(updated);
});

// Xoá hồ sơ khám
const deleteMedicalHistory = catchAsync(async (req, res) => {
  await MedicalHistory.findByIdAndDelete(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMedicalHistory,
  getAllMedicalHistories,
  getHistoriesByPatientId,
  updateMedicalHistory,
  deleteMedicalHistory,
};
