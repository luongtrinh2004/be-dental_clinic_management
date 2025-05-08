const mongoose = require('mongoose');
const Counter = require('./counter.model');

const patientSchema = new mongoose.Schema(
  {
    patientCode: { type: String, unique: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'], required: true },
    dateOfBirth: { type: Date, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

patientSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'patientCode' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    this.patientCode = String(counter.value).padStart(6, '0');
  }
  next();
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
