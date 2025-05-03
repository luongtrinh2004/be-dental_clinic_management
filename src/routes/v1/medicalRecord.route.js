const express = require('express');
const router = express.Router();
const medicalRecordController = require('../../controllers/medicalRecord.controller');

router.get('/:patientId', medicalRecordController.getRecordsByPatientId);

module.exports = router;
