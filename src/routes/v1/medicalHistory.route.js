const express = require('express');
const { medicalHistoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { medicalHistoryValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin', 'staff'),
    validate(medicalHistoryValidation.createMedicalHistory),
    medicalHistoryController.createMedicalHistory
  )
  .get(auth('admin', 'staff'), medicalHistoryController.getAllMedicalHistories);

router
  .route('/patient/:patientId')
  .get(
    auth('admin', 'staff'),
    validate(medicalHistoryValidation.getByPatient),
    medicalHistoryController.getHistoriesByPatientId
  );

router
  .route('/:id')
  .patch(
    auth('admin', 'staff'),
    validate(medicalHistoryValidation.updateMedicalHistory),
    medicalHistoryController.updateMedicalHistory
  )
  .delete(
    auth('admin', 'staff'),
    validate(medicalHistoryValidation.getOrDelete),
    medicalHistoryController.deleteMedicalHistory
  );

module.exports = router;
