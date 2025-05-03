const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },

    appointmentDate: { type: Date, required: true },
    nextAppointmentDate: { type: Date },
    medicalHistory: { type: String },
    note: { type: String },
    cost: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Đang điều trị', 'Hoàn thành điều trị', 'Hủy bỏ điều trị'],
      default: 'Đang điều trị',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
module.exports = MedicalRecord;
