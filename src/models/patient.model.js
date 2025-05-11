const mongoose = require('mongoose');
const Counter = require('./counter.model');
const { toJSON, paginate } = require('./plugins');

const patientSchema = new mongoose.Schema(
  {
    // ** User created fields
    name: { type: String, required: true },
    gender: { type: Number, enum: [0, 1, 2], required: true },
    dateOfBirth: { type: Date, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },

    // ** Server-generated fields
    patientCode: { type: String, unique: true },
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

patientSchema.plugin(toJSON);
patientSchema.plugin(paginate);

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

patientSchema.statics.isPhoneExist = async function (phone, excludePatientId) {
  const patient = await this.findOne({ phone, _id: { $ne: excludePatientId } });
  return !!patient;
};

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
