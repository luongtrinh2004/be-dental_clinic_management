const express = require('express');
const { medicalHistoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { medicalHistoryValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin', 'user'),
    validate(medicalHistoryValidation.createMedicalHistory),
    medicalHistoryController.createMedicalHistory
  )
  .get(auth('admin', 'user'), medicalHistoryController.getAllMedicalHistories);

router
  .route('/patient/:patientId')
  .get(
    auth('admin', 'user'),
    validate(medicalHistoryValidation.getByPatient),
    medicalHistoryController.getHistoriesByPatientId
  );

router
  .route('/:id')
  .patch(
    auth('admin', 'user'),
    validate(medicalHistoryValidation.updateMedicalHistory),
    medicalHistoryController.updateMedicalHistory
  )
  .delete(
    auth('admin', 'user'),
    validate(medicalHistoryValidation.getOrDelete),
    medicalHistoryController.deleteMedicalHistory
  );

module.exports = router;
