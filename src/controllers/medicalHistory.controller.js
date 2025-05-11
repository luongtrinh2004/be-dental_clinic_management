const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const medicalHistoryService = require('../services/medicalHistory.service');

// Tạo mới hồ sơ khám
const createMedicalHistory = catchAsync(async (req, res) => {
  const history = await medicalHistoryService.createMedicalHistory(req.body);
  res.status(httpStatus.CREATED).json(history);
});

// Lấy tất cả hồ sơ khám
const getAllMedicalHistories = catchAsync(async (req, res) => {
  const histories = await medicalHistoryService.getAllMedicalHistories();
  res.status(httpStatus.OK).json(histories);
});

// Lấy hồ sơ theo bệnh nhân (mới nhất đầu tiên)
const getHistoriesByPatientId = catchAsync(async (req, res) => {
  const histories = await medicalHistoryService.getHistoriesByPatientId(req.params.patientId);
  res.status(httpStatus.OK).json(histories);
});

// Cập nhật hồ sơ khám
const updateMedicalHistory = catchAsync(async (req, res) => {
  const updated = await medicalHistoryService.updateMedicalHistory(req.params.id, req.body);
  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Không tìm thấy hồ sơ khám' });
  }
  res.status(httpStatus.OK).json(updated);
});

// Xoá mềm hồ sơ khám
const deleteMedicalHistory = catchAsync(async (req, res) => {
  const deleted = await medicalHistoryService.deleteMedicalHistory(req.params.id);
  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Không tìm thấy hồ sơ khám' });
  }
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMedicalHistory,
  getAllMedicalHistories,
  getHistoriesByPatientId,
  updateMedicalHistory,
  deleteMedicalHistory,
};
