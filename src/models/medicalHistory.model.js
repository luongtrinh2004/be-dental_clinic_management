const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicalService: { type: String, required: true },
    note: { type: String },
    cost: { type: Number, default: 0 },
    appointmentDate: { type: Date, required: true },
    nextAppointmentDates: [{ type: Date }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);
module.exports = MedicalHistory;
