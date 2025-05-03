const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: String, required: true },
  warranty: { type: String, default: null },
});

const groupedServiceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // VD: Răng sữa
  types: [serviceTypeSchema],
});

const structuredServiceSchema = new mongoose.Schema(
  {
    title: { type: String }, // VD: HÀN RĂNG
    services: [groupedServiceSchema],
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', structuredServiceSchema);
module.exports = Service;
