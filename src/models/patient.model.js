// models/patient.model.js
const mongoose = require('mongoose');
const Counter = require('./counter.model');

const patientSchema = new mongoose.Schema(
  {
    patientCode: { type: String, unique: true }, // VD: '000001', '000002'
    name: { type: String, required: true },
    gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'], required: true },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number },
    phone: { type: String, required: true, unique: true },
    appointmentDate: { type: Date },
    address: { type: String, required: true },
    email: { type: String },
    medicalHistory: { type: String },
    note: { type: String },
    status: {
      type: String,
      enum: ['Đang điều trị', 'Hoàn thành điều trị', 'Hủy bỏ điều trị'],
      default: 'Đang điều trị',
    },
    nextAppointmentDate: { type: Date }, // Ngày tái khám
    cost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware: tự sinh mã bệnh nhân
patientSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'patientCode' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const code = String(counter.value).padStart(6, '0');
    this.patientCode = code;
  }
  next();
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
