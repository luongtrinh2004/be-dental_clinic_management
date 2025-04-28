const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'], required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    email: { type: String }, // Thêm email
    dateOfBirth: { type: Date }, // Thêm ngày sinh
    medicalHistory: { type: String },
    note: { type: String }, // Ghi chú thêm của bác sĩ
    status: {
      type: String,
      enum: ['Đang điều trị', 'Hoàn thành điều trị', 'Hủy bỏ điều trị'],
      default: 'Đang điều trị',
    }, // Trạng thái bệnh nhân
  },
  {
    timestamps: true,
    versionKey: false, // Tắt __v
  }
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
