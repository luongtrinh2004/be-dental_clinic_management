const mongoose = require('mongoose');

const serviceItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  warranty: { type: String, default: null },
});

const serviceSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    services: [serviceItemSchema],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
