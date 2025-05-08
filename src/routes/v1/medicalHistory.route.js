const express = require('express');
const router = express.Router();
const medicalHistoryController = require('../../controllers/medicalHistory.controller');

router.post('/', medicalHistoryController.createMedicalHistory);
router.get('/', medicalHistoryController.getAllMedicalHistories);
router.get('/patient/:patientId', medicalHistoryController.getHistoriesByPatientId);
router.put('/:id', medicalHistoryController.updateMedicalHistory);
router.delete('/:id', medicalHistoryController.deleteMedicalHistory);

module.exports = router;
