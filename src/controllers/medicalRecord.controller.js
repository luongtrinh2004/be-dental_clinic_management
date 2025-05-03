const mongoose = require('mongoose');
const MedicalRecord = require('../models/medicalRecord.model');

exports.getRecordsByPatientId = async (req, res) => {
  try {
    const id = req.params.patientId.trim();

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'patientId không hợp lệ' });
    }

    const records = await MedicalRecord.find({
      patientId: new mongoose.Types.ObjectId(id),
    }).sort({ appointmentDate: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy lịch sử khám', error: err.message });
  }
};
