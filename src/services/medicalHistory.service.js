const MedicalHistory = require('../models/medicalHistory.model');

/**
 * Tạo mới lịch sử khám
 */
const createMedicalHistory = async (data) => {
  return MedicalHistory.create({
    ...data,
    nextAppointmentDates: data.nextAppointmentDates || [],
  });
};

/**
 * Lấy toàn bộ lịch sử khám (có populate bệnh nhân)
 */
const getAllMedicalHistories = async () => {
  return MedicalHistory.find().populate('patientId');
};

/**
 * Lấy lịch sử theo bệnh nhân, sắp xếp theo ngày khám mới nhất
 */
const getHistoriesByPatientId = async (patientId) => {
  return MedicalHistory.find({ patientId }).sort({ appointmentDate: -1 });
};

/**
 * Cập nhật lịch sử khám
 */
const updateMedicalHistory = async (id, data) => {
  return MedicalHistory.findByIdAndUpdate(
    id,
    {
      ...data,
      nextAppointmentDates: data.nextAppointmentDates || [],
    },
    { new: true }
  );
};

/**
 * Xóa vĩnh viễn (hoặc có thể chuyển sang soft delete nếu sau này thêm field `status`)
 */
const deleteMedicalHistory = async (id) => {
  const history = await MedicalHistory.findById(id);
  if (!history) return null;

  await MedicalHistory.findByIdAndDelete(id); // hard delete
  return history;
};

module.exports = {
  createMedicalHistory,
  getAllMedicalHistories,
  getHistoriesByPatientId,
  updateMedicalHistory,
  deleteMedicalHistory,
};
