const express = require('express');
const { patientController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { patientValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), validate(patientValidation.createPatient), patientController.createPatient)
  .get(auth('admin', 'user'), validate(patientValidation.queryPatients), patientController.queryPatients);

router
  .route('/:patientId')
  .get(patientController.getPatientById)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient);

module.exports = router;
